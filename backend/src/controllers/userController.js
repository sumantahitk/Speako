import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        // const currentUser=await User.findById(currentUserId);

        const currentUser = await req.user;

        const recommendedUser = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },//exclude current user  (ne->not equal)
                { $id: { $nin: currentUser.friends } },//exclude current user's friends (nin->not in)
                { isOnboarded: true }
            ]
        })

        res.status(200).json(recommendedUser);

    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);

    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req,res){
    try{
        const myId=req.user.id;
        const {id:recipientId}=req.params;
        
        //prevent sending request to yourself
        if(myId===recipientId){
            res.status(400).json({message:"Cannot send friend request to yourself"})
        } 
        const recipient=await User.findById(recipientId);
        if(!recipient){
            res.status(404).json({message:"User not found"});
        }
        const sender=await User.findById(myId);
        //check if recipient is already in sender's friends list
        if(sender.friends.includes(recipientId)){
            res.status(400).json({message:"You are already friends with this user"})
            }

        //check if sender has already sent a request to recipient
        const existingRequest=await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });
        if(existingRequest){
        return  res.status(400).json({message:"You have already sent a friend request to this user"})
        }

        //create new friend request
        const friendRequest=await FriendRequest.create({
            sender:myId,
            recipient:recipientId
            });
            res.status(201).json(friendRequest);
    }catch(error){
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId}=req.params;

        const friendRequest=await FriendRequest.findById(requestId);
        if(!friendRequest){
            res.status(404).json({message:"Friend request not found"});
            }
         //verify the current user is the recipient of the friend request
         if(friendRequest.recipient.toString()!==req.user.id){
            res.status(400).json({message:"You are not the recipient of this friend request"})
                }
               // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    //delete the friend request from the database
    // await FriendRequest.findByIdAndDelete(requestId);


    res.status(200).json({message:"Friend request accepted"});
   
}
    catch(error){
        console.error("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
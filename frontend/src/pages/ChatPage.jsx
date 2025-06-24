import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';

// import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import {Channel, ChannelHeader, Chat, MessageInput, MessageList, Window} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';

const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY;


const ChatPage = () => {

  const {id:targetUserId}=useParams();

  const [chatClient,setChatClient]=useState(null);
  const [channel,setChannel]=useState(null);
  const [loading,setLoading]=useState(true);

  const {authUser}=useAuthUser();
  const {data:tokenData}=useQuery({
    queryKey: ['streamToken'],
    queryFn:getStreamToken,
    enabled:!!authUser//this will run only when authUser is availble
  })

      useEffect(()=>{
        const initChat=async()=>{
              if(!tokenData?.token || !authUser) return ;

              try{
                console.log("Initializing stream chat client...");

                const client = StreamChat.getInstance(STREAM_API_KEY);

                await client.connectUser({
                  id:authUser._id,
                  name:authUser.fullName,
                  image:authUser.profilepic,
                },tokenData.token)

                const channelId=[authUser._id,targetUserId].sort().join("_");

                //you and me
                //if i start the chat=>channelId:[myId,yourId]
                //if you start the chat=>channelId:[yourId,myId]
                //that's why we are sort this to make it uniuqe

                const currChannel=client.channel("messaging",channelId,{
                  members:[authUser._id,targetUserId],
                });
                await currChannel.watch();
                setChatClient(client);
                setChannel(currChannel);
              }catch(error){
                  console.log("Error initializing stream chat client:",error);
                  toast.error("Could not connect to chat. Please try again.");
              }
              finally{
                setLoading(false);
              }
        };
        initChat();
      },[tokenData,authUser,targetUserId]);

      const handleVideoCall=()=>{
           if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
      }

      if(loading || !chatClient ||!channel) return <ChatLoader/>
  return (
    <div className='h-[90vh]'>
      <Chat client={chatClient}>
          <Channel channel={channel}>
              <div className='w-full relative '>
                <CallButton handleVideoCall={handleVideoCall}/>
                  <Window>
                    <ChannelHeader/>
                      <MessageList/>
                      <MessageInput focus/>
                   
                  </Window>
              </div>
          </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage;

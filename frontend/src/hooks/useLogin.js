import {  useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const useLogin=()=>{
     const queryClient=useQueryClient();
     const {
    mutate,
    isPending,
   
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) =>{
       toast.success(data.message);
       queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
onError:(error)=>
        {
          toast.error(error.response.data.message);
          console.log(error);
        },

  });
  return {isPending,loginMutation:mutate};

}

export default useLogin;
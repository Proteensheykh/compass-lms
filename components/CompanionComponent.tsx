"use client"

import { getSubjectColor } from "@/constants"
import { vapi } from "@/lib/vapi.sdk"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import soundwaves from "@/constants/soundwaves.json"
import { cn, configureAssistant } from "@/lib/utils"
import { addToSessionHistory } from "@/lib/actions/companion.action"

enum CallStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
  CONNECTING = "connecting",
  FINISHED = "finished"
}


const CompanionComponent = ( {companionId, name, subject, topic, userName, userImage, voice, style, }: CompanionComponentProps ) => {

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (lottieRef){
      if (isSpeaking){
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
    
  }, [isSpeaking, lottieRef])
  
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE)
    }

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED)
      addToSessionHistory(companionId)
    }

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prevMessages) => [newMessage, ...prevMessages])
      }
    }
    const onSpeechStart = () => setIsSpeaking(true)

    const onSpeechEnd = () => setIsSpeaking(false)

    const onError = (error: Error) => {
      console.error("Error in call: ", error)
    }

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("error", onError)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("error", onError)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
    }
  })


  const toggleMicrophone = () => {
    try {
      // Only toggle microphone if call is active
      if (callStatus === CallStatus.ACTIVE) {
        const currentMuteState = vapi.isMuted()
        vapi.setMuted(!currentMuteState)
        setIsMuted(!currentMuteState)
      } else {
        // If no active call, just toggle the UI state
        setIsMuted(!isMuted)
      }
    } catch (error) {
      console.error('Error toggling microphone:', error)
      // Fallback: just toggle the UI state
      setIsMuted(!isMuted)
    }
  }

  const handleConnect = async () => {
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: {subject, topic, style},
    }

    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }
  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>

        {/* Companion Section */}
        <div className='companion-section'>
          <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject)}}>
            <div className={
              cn(
                'absolute transition-opacity duration-1000',
              callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0',
              callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse',
              )
            }>
              <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-[80px] max-sm:h-[80px]"/>
            </div>

            {/* Companion Lottie Voice Animation*/}
            <div className={cn(
              'absolute transition-opacity duration-1000',
              callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0',
            )}
            >
              <Lottie 
                lottieRef={lottieRef} 
                animationData={soundwaves} 
                autoPlay={false} 
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        {/* User Section */}
        <div className="user-section">
          {/* User Avatar */}
          <div className="user-avatar">
            <Image src={userImage} alt={userName} width={130} height={130} className="rounded-lg "/>
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          {/* Microphone */}
          <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
            <Image src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt="Microphone" width={36} height={36} />
            <p className="max-sm:hidden">{isMuted ? "Turn on microphone" : "Turn off microphone"}</p>
          </button>

          {/* Call Button */}
          <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white duration-300', callStatus === CallStatus.ACTIVE ? "bg-red-500" : "bg-primary",
            callStatus === CallStatus.CONNECTING && "animate-pulse"
          )} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}>
            {callStatus === CallStatus.ACTIVE 
            ? "End session" 
            : callStatus === CallStatus.CONNECTING 
            ? "Connecting..." 
            : "Start session"}
          </button>
        </div>
      </section>

      {/* Transcript */}
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message) => {
            if(message.role === "assistant"){
              return (
                <p key={message.content} className="max-sm:text-sm">{name.split(" ")[0].replace("/[.,]/g", "")} : {message.content}</p>
              )
            } else {
              return (
                <p key={message.content} className="text-primary max-sm:text-sm">{userName.split(" ")[0].replace("/[.,]/g", "")}: {message.content}</p>
              )
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  )
}

export default CompanionComponent

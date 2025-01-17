import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { use } from 'react';
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    const [loadedData, setLoadedData] = useState([])

    const [Video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,

    })
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = Video;
    useGSAP(()=>{
        gsap.to('#video',{
            scrollTrigger:{
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => { 
                setVideo((prev) => ({...prev, startPlay: true, isPlaying: true}))
            }

        })
    }, [isEnd, videoId])

    useEffect(()=>{
        if (loadedData.length > 3) {
            if(!isPlaying){
                videoRef.current[videoId].pause();
            }else{
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])

    const handleLoadeMetadata = (i, e) => setLoadedData((prev) => [...prev, e])
    useEffect(()=>{
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if (span[videoId] ){
            //animate the progress of the videos
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    
                },
                onComplete: () => {

                }
            })
        }
    }, [videoId, startPlay])
    const handleProcess = (type, i) => {
        switch(type){
            case 'video-end':
                setVideo((prev) => ({...prev, isEnd: true, videoId: i + 1})) 
                break;
            case 'video-last':
                setVideo((prev) => ({...prev, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo((prev) => ({...prev, isLastVideo: false, videoId: 0}))
                break;
            case 'play':
                setVideo((prev) => ({...prev, isPlaying: !prev.isPlaying }))
                break;
            default:
                return Video;
        }
    }
    return (
        <>
        <div className="flex items-center">
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id="slidder">
                    <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                id='video' 
                                playsInline={true} 
                                preload='auto' 
                                muted
                                ref={(el) => videoRef.current[i] = el}
                                onPlay={() => setVideo((prev) => ({...prev, isPlaying: true}))}
                                onLoadedMetadata={(e)=> handleLoadeMetadata(i, e)}
                                >
                                    <source src={list.video} type='video/mp4'/>
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text)=>(
                                    <p className='md:text-2xl text-xl font-medium' key={text}>
                                        {text}
                                    </p>
                                ))}
                            </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_, i)=>(
                    <span
                        key={i}
                        ref={(el) => videoDivRef.current[i] = el}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer' 
                    >
                        <span 
                            className='absolute h-full w-full rounded-full'
                            ref={(el) => videoSpanRef.current[i] = el}
                        />
                    </span>
                ))}
            </div>
            <button className="control-btn">
                <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                alt={isLastVideo ? 'replay': !isPlaying ? 'play' : 'puse'} 
                onClick={isLastVideo ? ()=>handleProcess('video-reset') : !isPlaying ? ()=>handleProcess('play') : !isPlaying 
                    ? ()=>handleProcess('pause') : ()=>handleProcess('pause')}
                />
            </button>
        </div>
        </>
    )
}

export default VideoCarousel
import React, { useState, useRef } from 'react';

interface SensitiveVideoPlayerProps {
  src?: string; // URL if hosted
  title: string;
  description: string;
}

export const SensitiveVideoPlayer: React.FC<SensitiveVideoPlayerProps> = ({ src, title, description }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [localVideoSrc, setLocalVideoSrc] = useState<string | null>(src || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReveal = () => {
    setIsRevealed(true);
    // Auto-play when revealed if source exists
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
      }
    }, 100);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalVideoSrc(url);
      setIsRevealed(false); // Reset to hidden state for the new video
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100">
      <div className="p-5 border-b border-gray-50 bg-pink-50/30">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      <div className="relative aspect-video bg-gray-900 w-full overflow-hidden group">
        
        {/* Actual Video Element */}
        {localVideoSrc ? (
          <video 
            ref={videoRef}
            src={localVideoSrc} 
            className={`w-full h-full object-contain ${!isRevealed ? 'filter blur-xl scale-110 opacity-60' : ''} transition-all duration-700`}
            controls={isRevealed}
            playsInline
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
             <p>暂无视频</p>
          </div>
        )}

        {/* Privacy Overlay - Shows when NOT revealed */}
        {!isRevealed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md p-6 text-center transition-all">
            <div className="bg-white/10 p-3 rounded-full mb-3 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </div>
            <h4 className="text-white font-bold text-lg mb-1">包含医疗隐私内容</h4>
            <p className="text-gray-200 text-sm mb-6 leading-relaxed">
              本视频包含乳腺检查或手术相关的医疗画面。<br/>为了您的舒适体验，默认已进行模糊处理。
            </p>
            
            <button 
              onClick={handleReveal}
              disabled={!localVideoSrc}
              className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg shadow-pink-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              点击查看视频
            </button>

            {!localVideoSrc && (
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-300 mb-3">（演示模式：请选择您设备上的案例视频）</p>
                     <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs border border-white/40 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                     >
                        从相册选择视频
                     </button>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="video/*" 
                        className="hidden" 
                     />
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
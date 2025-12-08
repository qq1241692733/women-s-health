import React, { useState, useEffect } from 'react';
import { SensitiveVideoPlayer } from './components/SensitiveVideoPlayer';
import { getHealthAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'guide' | 'resources'>('home');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // External article data
  const weChatArticle = {
    title: "乳腺癌预防：你需要知道的一切",
    description: "全面了解日常习惯、自检技巧及早期预警信号，守护您的健康。",
    url: "https://mp.weixin.qq.com/s/KUtr_Z8lMYbPjfO29I6JDg",
    image: "https://picsum.photos/400/250?grayscale"
  };

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsLoadingAi(true);
    const response = await getHealthAdvice(aiQuestion);
    setAiResponse(response);
    setIsLoadingAi(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-sans pb-24">
      {/* Header - Simple & Clean */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center relative">
          <div className="absolute left-4 flex items-center gap-1.5">
             <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
               粉
             </div>
          </div>
          <h1 className="font-bold text-lg text-gray-800">
            {activeTab === 'home' && '女性健康手册'}
            {activeTab === 'guide' && '文胸选择指南'}
            {activeTab === 'resources' && '健康资源库'}
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        
        {/* === HOME TAB === */}
        {activeTab === 'home' && (
          <div className="animate-fade-in space-y-8">
            {/* Hero Section - Eye Catching */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 to-rose-300 shadow-xl text-white p-6 md:p-8">
              <div className="relative z-10">
                <p className="opacity-90 text-sm font-medium mb-1">关爱女性，从此刻开始</p>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  健康是给家人<br/>最好的礼物
                </h2>
                <div className="flex gap-3 mt-6">
                   <button 
                     onClick={() => setActiveTab('resources')}
                     className="bg-white text-pink-600 px-5 py-2 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform"
                   >
                     了解预防知识
                   </button>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-8 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute right-8 -top-8 w-24 h-24 bg-rose-500/20 rounded-full blur-xl"></div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center text-center gap-3 active:bg-pink-50 transition-colors">
                 <div className="text-3xl bg-pink-50 w-12 h-12 flex items-center justify-center rounded-full">🔍</div>
                 <div>
                   <h3 className="font-bold text-gray-800">定期自检</h3>
                   <p className="text-xs text-gray-500 mt-1">每月一次，远离风险</p>
                 </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center text-center gap-3 active:bg-pink-50 transition-colors">
                 <div className="text-3xl bg-green-50 w-12 h-12 flex items-center justify-center rounded-full">🥗</div>
                 <div>
                   <h3 className="font-bold text-gray-800">健康生活</h3>
                   <p className="text-xs text-gray-500 mt-1">均衡饮食，适度运动</p>
                 </div>
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 overflow-hidden">
               <div className="bg-indigo-50/50 p-5 border-b border-indigo-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                      <span>👩‍⚕️</span> 智能健康助理
                    </h3>
                    <p className="text-indigo-600/80 text-xs mt-1">有问题？随时问我</p>
                  </div>
               </div>
               <div className="p-5">
                  <div className="relative">
                      <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                          placeholder="例如：乳房胀痛正常吗？"
                          value={aiQuestion}
                          onChange={(e) => setAiQuestion(e.target.value)}
                      />
                      <button 
                          onClick={handleAskAi}
                          disabled={isLoadingAi}
                          className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-3 rounded-lg text-xs font-bold shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                      >
                          {isLoadingAi ? '...' : '提问'}
                      </button>
                  </div>
                  {aiResponse && (
                      <div className="mt-4 bg-indigo-50/30 p-4 rounded-xl text-gray-700 text-sm leading-relaxed border border-indigo-100">
                          <p className="font-bold text-indigo-900 mb-1 text-xs">回答：</p>
                          {aiResponse}
                      </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {/* === GUIDE TAB === */}
        {activeTab === 'guide' && (
          <div className="animate-fade-in space-y-6">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">为什么文胸很重要？</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  合适的文胸不仅是为了美观，更是为了淋巴系统的健康。
                  过紧的钢圈会压迫乳腺导管，阻碍淋巴回流，长期可能引发增生等问题。
                </p>
             </div>

             <div className="space-y-4">
               <h3 className="font-bold text-gray-800 ml-1">自测三部曲</h3>
               {[
                 { num: 1, title: "底围要平", desc: "背后的带子应该和地面平行，不应该往上跑。" },
                 { num: 2, title: "罩杯要满", desc: "乳房应该完全被包裹，不应该有肉溢出或空杯。" },
                 { num: 3, title: "钢圈要贴", desc: "钢圈应该平贴在肋骨上，绝不能压在乳房组织上。" },
               ].map((step) => (
                 <div key={step.num} className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-pink-400 flex gap-4 items-start">
                   <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">
                     {step.num}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-800">{step.title}</h4>
                     <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="bg-pink-50 p-5 rounded-2xl text-center">
               <p className="text-pink-800 font-bold mb-1">💡 温馨提示</p>
               <p className="text-pink-700 text-sm">身体会随年龄和体重变化，建议每6个月重新测量一次尺码。</p>
             </div>
          </div>
        )}

        {/* === RESOURCES TAB === */}
        {activeTab === 'resources' && (
            <div className="animate-fade-in space-y-8">
                
                {/* WeChat Article Link */}
                <a 
                   href={weChatArticle.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform"
                >
                    <div className="h-40 bg-gray-200 relative">
                        <img src={weChatArticle.image} alt="文章封面" className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-2 py-1 rounded shadow-sm">
                          推荐阅读
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{weChatArticle.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{weChatArticle.description}</p>
                        <div className="flex items-center text-pink-600 text-sm font-semibold">
                            阅读全文 
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </a>

                {/* Sensitive Video Section */}
                <div>
                     <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-6 bg-red-400 rounded-full"></span>
                        <h2 className="text-lg font-bold text-gray-800">临床案例参考</h2>
                     </div>
                     
                    <SensitiveVideoPlayer 
                      title="真实医疗影像" 
                      description=""
                      // 本地示例路径：请将你的视频文件命名为 `clinical_case.mp4` 并放到 `public/videos` 下
                      src="/videos/clinical_case.mp4" 
                    />
                     <p className="text-xs text-gray-400 mt-3 text-center px-4">
                        * 视频仅供医疗科普教育使用，请勿用于非医疗目的传播。
                     </p>
                </div>
            </div>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'home' ? 'text-pink-600' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">首页</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'guide' ? 'text-pink-600' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">指南</span>
          </button>

          <button 
            onClick={() => setActiveTab('resources')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'resources' ? 'text-pink-600' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">案例</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
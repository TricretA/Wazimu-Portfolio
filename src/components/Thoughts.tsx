import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeUp, StaggerContainer, StaggerItem } from './Animations';
import { X } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "Why Most Kenyan Business Websites Fail (It's Not the Design)",
    tag: "Strategy",
    content: "Most Kenyan business websites fail before a visitor even reads a word. Not because they look bad — but because they were built to exist, not to convert. The owner paid someone KSh 8,000, got a site with a hero image and a contact form, and called it done. No clear offer. No reason to act. No system behind it. A website isn't a business card. It's a sales rep that works 24/7. If it can't answer 'what do you do, who is it for, and what should I do next' in under 5 seconds — it's failing you silently every day. The fix isn't a redesign. It's a strategy rethink."
  },
  {
    id: 2,
    title: "The Real Cost of Doing It Manually",
    tag: "Automation",
    content: "Every time a Kenyan SME owner manually sends an M-Pesa confirmation, types a customer reply at midnight, or copies data from WhatsApp into a spreadsheet — they're paying a cost they can't see on a balance sheet. Automation isn't a luxury for big companies. A WhatsApp bot that confirms orders, triggers M-Pesa STK push, and updates your records costs less than one month of doing it yourself. The question isn't whether you can afford to automate. It's whether you can afford not to. Time is the one resource that doesn't refill."
  },
  {
    id: 3,
    title: "Why 'I'll Add AI Later' Is a Business Decision You'll Regret",
    tag: "AI",
    content: "Every week you wait to integrate AI into your workflow, a competitor who did it last month gets faster, cheaper, and harder to beat. Not because AI is magic — but because compounded operational efficiency is real. AI doesn't replace your business. It removes the bottlenecks that keep you stuck at the same revenue ceiling. One automated system can return 10x its cost in recovered time within 30 days. The best time to start was 6 months ago. The second best is today."
  }
];

export default function Thoughts() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  useEffect(() => {
    if (selectedPostId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedPostId]);

  return (
    <div className="py-20 md:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <FadeUp className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Insights</h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerChildren={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.id} yOffset={20} className="h-full">
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                className="bg-[#1a1a1a] border border-transparent rounded-3xl p-6 md:p-8 flex flex-col h-full cursor-pointer transition-colors duration-300 shadow-xl"
                onClick={() => setSelectedPostId(post.id)}
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/80 px-3 py-1 rounded-full shadow-sm">
                    {post.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-lg leading-snug mb-3 text-white">{post.title}</h3>
                
                <div className="relative overflow-hidden mb-6">
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10">
                  <span className="text-xs font-semibold text-white/80">
                    Read more →
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPostId(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedPostId(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="mb-6 pr-12">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-3 py-1 rounded-full shadow-sm inline-block mb-4">
                  {selectedPost.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
              
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                {selectedPost.content.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

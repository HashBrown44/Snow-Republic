/**
 * Moody animated cloudscape for the light (frost) sections: heavily-blurred
 * storm-blue layers drift and breathe over a soft overcast wash, like weather
 * rolling in off the mountain. Blur is rasterized once and only transforms
 * animate, so it stays GPU-cheap; drift pauses under prefers-reduced-motion.
 */
export function FrostBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* overcast wash — darker toward the top edge, clears toward the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(38,64,90,0.22) 0%, rgba(38,64,90,0.07) 26%, transparent 52%)",
        }}
      />

      {/* light break in the clouds for contrast */}
      <div className="animate-cloud-a absolute left-[18%] top-[24%] h-[52%] w-[52%] rounded-full bg-[#e7f0f8]/70 blur-[80px] [animation-delay:-14s]" />
      <div className="animate-cloud-a absolute right-[14%] bottom-[-14%] h-[46%] w-[46%] rounded-full bg-[#d5e6f3]/60 blur-[70px] [animation-delay:-22s]" />

      {/* the moody storm layers */}
      <div className="animate-cloud-b absolute -left-[10%] -top-[16%] h-[62%] w-[60%] rounded-full bg-[#7ba3c6]/80 blur-[80px]" />
      <div className="animate-cloud-c absolute -right-[8%] top-[2%] h-[64%] w-[56%] rounded-full bg-[#5b86ab]/75 blur-[90px]" />
      <div className="animate-cloud-b absolute -left-[6%] bottom-[-24%] h-[60%] w-[60%] rounded-full bg-[#4d7aa1]/60 blur-[95px] [animation-delay:-30s]" />
      <div className="animate-cloud-c absolute right-[22%] top-[26%] h-[50%] w-[52%] rounded-full bg-[#3d688f]/45 blur-[90px] [animation-delay:-8s]" />
      <div className="animate-cloud-a absolute left-[6%] top-[44%] h-[44%] w-[50%] rounded-full bg-[#5f8db3]/45 blur-[85px] [animation-delay:-38s]" />
    </div>
  );
}

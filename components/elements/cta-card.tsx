import Image from "next/image";
function CTACard() {
  return (
    <div className="rounded-md bg-slate-100 px-6 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30 z-10" />
      <Image
        fill
        alt="CTA Card Image"
        className="object-center object-cover"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="text-4xl font-semibold mt-3">
          Explore the world with me!
        </h3>
        <p className="max-w-lg mt-2 text-lg">
          Explore the world Explore the world Explore the world Explore the
          world Explore the world Explore the world Explore the world Explore
          the world Explore the world Explore the world Explore the world
          Explore the world Explore the world
        </p>
        <form action="" className="flex items-center w-full gap-2 mt-6">
          <input
            type="text"
            className="w-full bg-white/80 text-base rounded-md px-3 py-3 placeholder:text-sm outline-none md:w-auto focus:ring-2 ring-neutral-600 "
            placeholder="Write your email"
          />
          <button className="bg-neutral-900 whitespace-nowrap rounded-md text-neutral-200 px-3 py-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default CTACard;

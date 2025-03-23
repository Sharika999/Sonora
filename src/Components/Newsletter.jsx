import React from 'react'

const Newsletter = () => {
  return (
    <div>
      <div class="bg-white text-[#333] font-[sans-serif] mb-12">
      <div class="max-w-lg mx-auto p-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Subscribe our newsletter</h2>
        <p class="text-base">Subscribe to our newsletter to get updates on new products and offers.</p>
        <div class="mt-8 flex items-center bg-gray-100 rounded overflow-hidden sm:w-11/12 mx-auto">
          <input name="email" type="email" class="flex-1 w-full bg-transparent text-sm px-4 py-3 outline-none" placeholder="Enter email" />
          <button type="button"
            class="w-max px-6 py-3 text-sm tracking-wider font-semibold outline-none border-none bg-blue-700 text-white hover:bg-blue-500 transition-all duration-300">Subscribe</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Newsletter

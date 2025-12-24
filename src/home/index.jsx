import React from "react";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { FileText, Palette, Download } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight animate-fade-in">
  Build a{" "}
  <span className="bg-gradient-to-r from-[#4d0c0c] via-[#7a1f1f] to-[#2b0a0a] bg-clip-text text-transparent">
    Professional Resume
  </span>
  <br className="hidden md:block" />
  in Minutes
</h1>


        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in delay-150">
          Create, customize, and download a modern resume with live preview,
          AI assistance, and beautiful themes — all in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4 animate-fade-in delay-300">
          <Link to="/dashboard">
            <Button
  size="lg"
  className="px-8 bg-[#4d0c0c] hover:bg-[#3b0a0a] text-white transition"
>
  Get Started
</Button>
          </Link>

          
        </div>
      </section>

      
      <section
  className="px-6 py-20"
  style={{ backgroundColor: "#f7eded" }}
>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-14">
      How It Works
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
        <div
          className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#f5eaea", color: "#4d0c0c" }}
        >
          <FileText />
        </div>
        <h3 className="font-semibold text-lg">Fill Your Details</h3>
        <p className="text-sm text-gray-500 mt-2">
          Enter your personal details, skills, education, and experience
          using our easy-to-use form.
        </p>
      </div>

      
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
        <div
          className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#f2e3e3", color: "#4d0c0c" }}
        >
          <Palette />
        </div>
        <h3 className="font-semibold text-lg">Customize Theme</h3>
        <p className="text-sm text-gray-500 mt-2">
          Choose colors, layout, and see live preview updates instantly
          as you build your resume.
        </p>
      </div>

      
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
        <div
          className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#f7eded", color: "#4d0c0c" }}
        >
          <Download />
        </div>
        <h3 className="font-semibold text-lg">Download & Share</h3>
        <p className="text-sm text-gray-500 mt-2">
          Export your resume and use it confidently for jobs,
          internships, and applications.
        </p>
      </div>
    </div>
  </div>
</section>


      
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-6">
      Why Use This Resume Builder?
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
      Designed for students and professionals who want speed,
      customization, and clean design.
    </p>

    <div className="grid md:grid-cols-2 gap-8 text-left">
      
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#f7eded] to-[#f2e3e3]
                      hover:shadow-lg hover:-translate-y-1 transition-all">
        <h3 className="font-semibold text-lg text-[#4d0c0c]">
          ⚡ Live Preview
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          See your resume update instantly while editing.
        </p>
      </div>

      
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#f5eaea] to-[#efe0e0]
                      hover:shadow-lg hover:-translate-y-1 transition-all">
        <h3 className="font-semibold text-lg text-[#4d0c0c]">
          🎨 Theme Customization
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Choose colors and styles that match your personality.
        </p>
      </div>

      
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#f3e6e6] to-[#ecdede]
                      hover:shadow-lg hover:-translate-y-1 transition-all">
        <h3 className="font-semibold text-lg text-[#4d0c0c]">
          🔐 Secure Login
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Authentication powered by Clerk for secure access.
        </p>
      </div>

      
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#f7eded] to-[#f1e2e2]
                      hover:shadow-lg hover:-translate-y-1 transition-all">
        <h3 className="font-semibold text-lg text-[#4d0c0c]">
          🚀 Fast & Simple
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          No complex setup — just build and download.
        </p>
      </div>
    </div>
  </div>
</section>


    
      <section className="py-20 text-center bg-gradient-to-r from-[#4d0c0c] via-[#7a1f1f] to-[#2b0a0a] text-white">
  <h2 className="text-3xl font-bold">
    Ready to Build Your Resume?
  </h2>

  <p className="mt-4 text-red-100">
    Start creating a professional resume today.
  </p>

  <Link to="/dashboard">
    <Button
      size="lg"
      className="mt-6 bg-white hover:bg-gray-100"
      style={{ color: "#4d0c0c" }}
    >
      Start Now
    </Button>
  </Link>
</section>
    <footer className="bg-black text-gray-300">
  <div className="max-w-6xl mx-auto px-6 py-10 text-center">
    
    
    <h3 className="text-lg font-semibold text-white">
      Soujanya Maharudra Bailawad
    </h3>

  
    <p className="mt-2 text-sm">
      <a
        href="mailto:soujanyamaharudra@gmail.com"
        className="hover:text-white transition"
      >
        soujanyabailawad@gmail.com
      </a>
    </p>

  
    <div className="w-full h-px bg-gray-700 my-6" />

    
    <p className="text-xs text-gray-400">
      © {new Date().getFullYear()}  All rights reserved.
    </p>

    
    <p className="text-xs text-gray-500 mt-1">
      Last updated: {new Date().toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })}
    </p>
  </div>
</footer>


    </div>
  );
}

export default Home;

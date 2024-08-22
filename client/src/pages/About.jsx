import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Mukesh' Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to Mukesh's Blog! This blog was created by Mukesh Sharma
              as a personal project to share his thoughts and ideas with the
              world. Mukesh is a MERN stack developer, specializing in building dynamic and responsive web applications. With a strong foundation in MongoDB, Express.js, React.js, and Node.js, Mukesh has successfully contributed to several projects, ensuring seamless user experiences and efficient backend operations.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, book summary, leetcode problem solution, and programming
              languages. Mukesh is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

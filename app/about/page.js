"use client";

import { FooterDisclaimer } from '../../components/Disclaimer';
import { BuyMeACoffeeButton } from '../../components/BuyMeACoffeeButton';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-[url('/blog-background.jpg')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">About DomGPT</h1>
        
        <div className="space-y-8">
          {/* --- Your existing content sections --- */}

          <section>
            <h2 className="text-2xl font-semibold mb-4">Who am I?</h2>
            <p className="mb-4">
              I live in the UK, have a family, and have worked in finance, as an entrepreneur 
              and in artificial intelligence. I&apos;m not keen on sharing more info - for the reasons 
              best given by Gwern <a href="https://gwern.net/me" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
            <p>
              I am not affiliated with Dominic Cummings and have never met him. If you are him, 
              please email (domgptlarp at Google&apos;s email service)- I&apos;m keen to clear up any IP issues / donate to Maths Circles / whatever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What is next?</h2>
            <p className="mb-4">
              The site is based on Cummings&apos; blog posts. I&apos;m keen to incorporate his tweets 
              and podcast / youtube interviews. These cost money directly and time through 
              opportunity costs. If I get a reasonable number of coffees then I&apos;ll implement 
              them in the next few weeks. Including these materials would improve the quality 
              of the output.
            </p>
            <p>
              Longer term I&apos;d also be interested in making similar sites for other figures. 
              Recently I have been thinking about Michael Nielsen and Stafford Beer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How is the site made?</h2>
            <p className="mb-4">
              The idea for this site is mine, but the tools recommended below (as well as all 
              the code) came from Claude. I have no technical ability. It was partly inspired 
              by a <a href="https://marginalrevolution.com/marginalrevolution/2024/12/how-to-read-a-book-using-o1.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">comment</a> from 
              Tyler Cowen: we should be shifting to a more question-lead paradigm of learning.
            </p>
            <p className="mb-4">The full stack is:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Pinecone and Cohere worked together to encapsulate and represent Dom&apos;s thoughts 
                  in a way which can be read by computers.</li>
              <li>GitHub is a kind of exercise book used by me and Claude to communicate with 
                  Railway and Vercel below.</li>
              <li>Railway does the heavy lifting - &apos;backend&apos;, while Vercel does the presentation 
                  - &apos;frontend&apos;.</li>
              <li>Claude takes the references generated by Pinecone and Cohere and presents it 
                  back to you the user.</li>
              <li>Grok / Aurora generated the background images.</li>
            </ol>
            <p>
              I&apos;d be open to making other pages  if you want a similar site made about you 
              or someone you think highly of. An ethical screen exists (&apos;No&apos; to Greta or Andrew Tate).
            </p>
          </section>
          
          <section className="mt-8 p-4 bg-gray-100/80 backdrop-blur-sm rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Legal Disclaimer</h2>
            <p className="text-sm text-gray-700">
              This site is an AI-powered parody/entertainment service with no affiliation to 
              Dominic Cummings or any associated entities. All responses are generated by AI 
              and may be inaccurate or inappropriate. Users interact with this service at their 
              own risk. No liability is accepted for any damages arising from the use of this 
              service. The site owner reserves the right to modify or terminate the service at 
              any time.
            </p>
          </section>
        </div>

        {/* 👇 Inserted Buy Me a Coffee button here */}
        <BuyMeACoffeeButton />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

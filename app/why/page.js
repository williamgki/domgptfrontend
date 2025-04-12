import Image from "next/image";

export default function WhyThisProject() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Image
        src="/twitter-background.jpg"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -z-10 h-full w-full"
      />

      <div className="p-10 rounded-lg shadow-xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg max-w-3xl w-full mx-auto my-24">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Dominic Cummings: Ideas Beyond the Blog
        </h1>

        <p className="mb-6 leading-relaxed text-lg text-gray-700">
          Loathe him, or like him, Dominic Cummings' has had a significant influence on the UK. The EU referendum and the Boris wave washed over Britain — and there may be more to come as Reform rises and ideas like ARIA begin to spread.
        </p>

        <p className="mb-6 leading-relaxed text-lg text-gray-700">
          This short essay though isn't about that. Instead, it argues that Cummings' dense, ambitious writing style means his ideas are often best understood through a simulacrum. Dialogue with an LLM allows the casual reader to understand more than they might glean from navigating Dom's sprawling blog posts alone.
        </p>

        <p className="mb-6 leading-relaxed text-lg text-gray-700">
          Dominic Cummings' writing features remarkable (even exhilarating) intellectual leaps. His blog posts integrate concepts from seemingly disparate fields, including political strategy, cognitive science, physics, history, management theory, military doctrine, and complexity science. Consider this characteristic example:
        </p>

        <p className="mb-6 leading-relaxed text-lg text-gray-700">
          <em>
            "Explore the frontiers of the science of prediction across different fields from physics to weather forecasting to finance and epidemiology. For example, ideas from physics about early warning systems in physical systems have application in many fields, including questions like: to what extent is it possible to predict which news will persist over different timescales, or predict wars from news and social media? There is interesting work combining game theory, machine learning, and Red Teams to predict security threats and improve penetration testing (physical and cyber). The Tetlock/IARPA project showed dramatic performance improvements in political forecasting are possible, contra what people such as Kahneman had thought possible. A recent Nature article by Duncan Watts explained fundamental problems with the way normal social science treats prediction and suggested new approaches — which have been almost entirely ignored by mainstream economists/social scientists. There is vast scope for applying ideas and tools from the physical sciences and data science/AI — largely ignored by mainstream social science, political parties, government bureaucracies and media — to social/political/government problems (as Vote Leave showed in the referendum, though this has been almost totally obscured by all the fake news: clue — it was <em>not ‘microtargeting’</em>)."
          </em>
        </p>

        <p className="mb-6 leading-relaxed text-lg text-gray-700 whitespace-normal">
          This is typical Cummings. He traverses disciplines, urging exploration of predictive science across physics, meteorology, finance, and epidemiology. He connects physical early warning systems to news persistence and conflict forecasting, then pivots to game theory, machine learning, and Red Teams for security threat prediction. His breadth of knowledge is undeniable, yet this density creates a whirlwind that can obscure his central insights beneath layers of interconnected thoughts.
        </p>

        <p className="mb-6 leading-relaxed text-lg text-gray-700">
          In contrast, a RAG-powered chatbot provides a superior way to understand

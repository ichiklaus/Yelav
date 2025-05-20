export default function About() {
  return (
    <section id='about' className='pt-32'>
      <div className='flex flex-col gap-y-4'>
        <h2 className='font-bold text-accent mb-3'>About me</h2>
        <p className='mb-2'>
          I&apos;m a Web Developer with a degree in Computer Systems Engineering
          who enjoys creating amazing web products and delivering great user
          experiences
        </p>
        <p className='mb-2'>
          And these are some of the technologies I’ve used to build those
          experiences:
        </p>
        <ul className='columns-2 list-disc lg:pl-6 ml-6 lg:ml-8 marker:text-accent mb-2'>
          <li>HTML5 & CSS3</li>
          <li>JavaScript</li>
          <li>jQuery</li>
          <li>React.js</li>
          {/* <li>Bootstrap</li> */}
          {/* <li>Tailwind CSS</li> */}
          <li>Firebase</li>
          <li>Wordpress</li>
          <li>Node.js</li>
          <li>Express.js</li>
        </ul>
      </div>
    </section>
  );
}

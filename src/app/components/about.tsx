export default function About() {
  return (
    <section id='about' className='pt-32 -mt-32'>
      <div className='flex flex-col gap-y-4'>
        <h2 className='text-4xl font-bold text-accent mb-3'>About me</h2>
        <p className='text-lg mb-2'>
          I'm a Frontend Web Developer with a degree in Information Systems Engineering who enjoys
          creating amazing web products and delivering great user experiences
        </p>
        <p className='mb-2'>
          And these are some of the technologies I’ve used to build those
          experiences:
        </p>
        <ul className='columns-2 list-disc pl-6 marker:text-accent mb-2'>
          <li>HTML & CSS</li>
          <li>Javascript</li>
          <li>JQuery</li>
          <li>React</li>
          {/* <li>Bootstrap</li> */}
          {/* <li>Tailwind CSS</li> */}
          <li>Firebase</li>
          <li>Wordpress</li>
          <li>Node.js</li>
        </ul>
      </div>
    </section>
  );
}

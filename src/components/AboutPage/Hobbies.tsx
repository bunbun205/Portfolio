import { motion } from "framer-motion";

const Hobbies = () => (
  <motion.section
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
    className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg dark:shadow-none shadow-gray-500"
  >
    <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
    <ul className="list-disc list-inside space-y-5">
      <li>I dabble in all sorts of traditional art media, like graphite, watercolor, gouache etc. I sometimes do acrylics but mainly stick to watercolor and graphite. Checkout my Instagram for some of my art posts!</li>
      <li>Another one of my frequent hobbies is crocheting. To me it feels like a natural progression to 3D art. It's cheaper than 3D printing, and takes less time than other sculpture. And it's fun! I do not usually post my crochet creations, but do ask for it if you're interested!</li>
      <li>For a while I was into Aquascaping and Terrascaping. I had two aquariums and a terrarium which I maintained regularly. I would love to get back into it, but it isn't the most accessible hobby and lies on the more expensive side.</li>
      <li>Along with those I was also into house-plants and I used to put them anywhere I could find space in my apartment. Luckily plants are not stuff usually would take issue with and are mostly appreciated.</li>
      <li>I also enjoy cooking and baking whenever I can find some time. Following and developing recipes, discovering new ingredients, creating something delicious - it's all simultaneously exciting and relaxing. I make great pancakes, and sometimes share with my co-workers, just FYI ;)</li>
      <li>I also do enjoy working out, but consistency is hard to get by.</li>
    </ul>
  </motion.section>
);
export default Hobbies;

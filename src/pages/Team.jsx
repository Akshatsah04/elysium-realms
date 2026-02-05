import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";

const teamdetail = [
  {
    key: 0,
    Name: "Elysium Team",
    position: "",
    img: "",
    contact: "9060926686",
    instagram: "",
    linkedin: "",
  },
  {
    key: 1,
    Name: "Kashish",
    fname: "Kashish Kumar",
    position: "Chairperson",
    discreption: "Kashish Kumar is the Chairperson of IEEE WIE, leading the team with vision, dedication, and strategic direction. With a strong commitment to empowering women in engineering and technology, she drives innovation, collaboration, and impactful initiatives within the community. Her leadership fosters growth, inclusivity, and excellence across all IEEE WIE activities.",
    img: "/EC/chair.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/kashish._kumar_?igsh=MWEzZTQ3dnN4emVtNw%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/kashish-kumar-527ba72b3",
  },
  {
    key: 2,
    Name: "Guneet",
    fname: "Guneet Pahwa",
    position: "Vice chairperson",
    discreption: "Guneet Pahwa serves as the Vice Chairperson of IEEE WIE with dedication and strategic vision. She plays a key role in coordinating initiatives, supporting leadership decisions, and ensuring smooth execution of events. With strong organizational skills and a collaborative mindset, Guneet actively contributes to fostering innovation, teamwork, and growth within the IEEE WIE community.",
    img: "/EC/vice.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/guneet_7_?igsh=MXM5emYzMTNhczZkMA==",
    linkedin: "https://www.linkedin.com/in/guneet-pahwa-350063264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    key: 3,
    Name: "Ishani",
    fname: "Ishani Arora",
    position: "Human Resource Director",
    discreption: "Ishani Arora serves as the Human Resource Director of IEEE WIE with a strong focus on teamwork and member engagement. She ensures smooth coordination within the team, fosters a positive working environment, and supports the growth and well-being of every member. With her approachable nature and organizational skills, Ishani plays a vital role in strengthening the foundation of the IEEE WIE community.",
    img: "/EC/hrd.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/ishaniiaroraa?igsh=N3M4aGxwbXJuZWI1",
    linkedin: "https://www.linkedin.com/in/ishani-arora-990959273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    key: 4,
    Name: "Shambhavi",
    fname: "Shambhavi Sharma",
    position: "Managing Director",
    discreption: "Shambhavi Sharma, the Managing Director of IEEE WIE, plays a key role in overseeing operations and ensuring the smooth execution of initiatives. With strong leadership and strategic thinking, she helps turn ideas into impactful actions while maintaining coordination across teams. Her dedication and clarity of vision contribute greatly to the club’s growth and success.",
    img: "/EC/md.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/shambhavi_0914?igsh=MXIycWE5ZjJubmowMw==",
    linkedin: "https://www.linkedin.com/in/shambhavi-sharma-855032312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    key: 5,
    Name: "Tanishk",
    fname: "Tanishk Mittal",
    position: "General Secretary",
    discreption: "Tanishk Mittal, the General Secretary of IEEE WIE, ensures the smooth coordination and execution of all club activities. With strong organizational skills and a proactive approach, Tanishk plays a vital role in managing communications, overseeing event planning, and maintaining seamless collaboration within the team. His dedication and leadership help drive the club’s initiatives forward efficiently and effectively.",
    img: "/EC/gensec.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/tqnishk.hehe/",
    linkedin: "https://www.linkedin.com/in/tanishk-mittal-b42719289/",
  },
  {
    key: 6,
    Name: "Akshit",
    fname: "Akshit Gupta",
    position: "Treasurer",
    discreption: "Akshit Gupta, the Treasurer of IEEE WIE, ensures the club’s financial planning and management are handled with precision and transparency. With a keen eye for detail and responsibility, he oversees budgeting, fund allocation, and resource management to support the successful execution of events and initiatives. His structured approach keeps the organization financially strong and well-organized.",
    img: "/EC/tres.jpg",
    contact: "9060926686",
    instagram: "https://www.instagram.com/akshitgupta05?igsh=bXV3OWk3MHc5ZWg3",
    linkedin: "https://www.linkedin.com/in/akshit-gupta-7a10962b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    key: 7,
    Name: "Aarav",
    fname: "Aarav",
    position: "Technical Secretary",
    discreption: "Aarav, the Technical Secretary of IEEE WIE, leads the club’s technical initiatives with innovation and precision. He plays a key role in organizing workshops, technical sessions, and project-driven activities, ensuring members gain hands-on learning experiences. With strong problem-solving skills and a passion for technology, he helps drive the club’s vision of empowering students through technical excellence.",
    img: "/EC/techsec.jpg",
    contact: "9060926686",
    instagram: "https://instagram.com/aaranay",
    linkedin: "https://linkedin.com/in/aaranay",
  },
];

function Team({ showHeader = true }) {
  const container = useRef();
  const tl = useRef(null);
  const tl1 = useRef(null);
  const tl2 = useRef(null);
  const tl3 = useRef(null);
  const tl4 = useRef(null);
  const tl5 = useRef(null);
  const tl6 = useRef(null);
  const tl7 = useRef(null);
  const [activeCard, setActiveCard] = useState(null);


  useGSAP(() => {
    // Initial size setting for boxes
    gsap.utils.toArray(".box").forEach((box) => {
      // gsap.set(box, { width: 200, height: 300 });

      box.addEventListener("mouseenter", () => {
        gsap.to(box, {
          // width: 220,
          // height: 320,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      box.addEventListener("mouseleave", () => {
        gsap.to(box, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Create timelines
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(".a", { y: -600, stagger: -0.05, ease: "power2.inout" });
    tl.current.to(".b", { y: -600, stagger: 0.05, ease: "power2.inout" }, "<");

    tl1.current = gsap.timeline({ paused: true });
    tl1.current.from(".aone", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl1.current.from(".bone", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl2.current = gsap.timeline({ paused: true });
    tl2.current.from(".atwo", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl2.current.from(".btwo", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl3.current = gsap.timeline({ paused: true });
    tl3.current.from(".athree", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl3.current.from(".bthree", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl4.current = gsap.timeline({ paused: true });
    tl4.current.from(".afour", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl4.current.from(".bfour", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl5.current = gsap.timeline({ paused: true });
    tl5.current.from(".afive", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl5.current.from(".bfive", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl6.current = gsap.timeline({ paused: true });
    tl6.current.from(".asix", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl6.current.from(".bsix", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

    tl7.current = gsap.timeline({ paused: true });
    tl7.current.from(".aseven", { y: 600, stagger: -0.04, ease: "power2.inout" });
    tl7.current.from(".bseven", { y: 600, stagger: 0.04, ease: "power2.inout" }, "<");

  }, { scope: container });

  const handleMouseEnter = (t, tsub) => {
    if (t?.current) t.current.play();
    if (tsub?.current) tsub.current.play();
  };

  const handleMouseLeave = (t, tsub) => {
    if (t?.current) t.current.reverse();
    if (tsub?.current) tsub.current.reverse();
  };

  return (

    <div ref={container} id="team" className="relative h-[150vh] sm:h-[120vh] md:h-[110vh] lg:h-[100vh] w-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]">
      {showHeader && <Header />}
      {/* Box Grid */}
      <div className="absolute top-[40%] sm:top-[50%] w-full h-[50%] flex justify-center items-center flex-wrap gap-4 ">
        {/* Chairperson */}
        <div className="flex flex-col justify-center items-center rounded-2xl ">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl1)}
            onMouseLeave={() => handleMouseLeave(tl, tl1)}
            onClick={() => setActiveCard(teamdetail[1])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[1].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-nowrap text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">Chairperson</div>
        </div>

        {/* Vice Chairperson */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl2)}
            onMouseLeave={() => handleMouseLeave(tl, tl2)}
            onClick={() => setActiveCard(teamdetail[2])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[2].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-nowrap text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">Vice-Chairperson</div>
        </div>

        {/* HRD */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl3)}
            onMouseLeave={() => handleMouseLeave(tl, tl3)}
            onClick={() => setActiveCard(teamdetail[3])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[3].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-wrap text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">HRD</div>
        </div>

        {/* MD */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl4)}
            onMouseLeave={() => handleMouseLeave(tl, tl4)}
            onClick={() => setActiveCard(teamdetail[4])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[4].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-center text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">Managing Director</div>
        </div>

        {/* GenSec */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl5)}
            onMouseLeave={() => handleMouseLeave(tl, tl5)}
            onClick={() => setActiveCard(teamdetail[5])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[5].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-center text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">General Secretary</div>
        </div>

        {/* Treasurer */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl6)}
            onMouseLeave={() => handleMouseLeave(tl, tl6)}
            onClick={() => setActiveCard(teamdetail[6])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[6].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-nowrap text-amber-50 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">Treasurer</div>
        </div>

        {/* TechSec */}
        <div className="flex flex-col justify-center items-center rounded-2xl">
          <div
            onMouseEnter={() => handleMouseEnter(tl, tl7)}
            onMouseLeave={() => handleMouseLeave(tl, tl7)}
            onClick={() => setActiveCard(teamdetail[7])}
            className="box w-[6rem] h-[10rem] lg:w-[8rem] lg:h-[12rem] xl:w-[9rem] xl:h-[13rem] 2xl:w-[11rem] 2xl:h-[15rem] bg-transparent rounded-2xl overflow-hidden cursor-pointer border border-primary/50 p-1"
          >
            <img src={teamdetail[7].img} alt="" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <div className="font-bold text-amber-50 text-center mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl">Technical Secretary</div>
        </div>
      </div>

      {/* Animated Text Container */}
      <div className="ani absolute inset-x-0 top-20 h-[400px] flex justify-center items-center font-extrabold text-[12vw] text-nowrap pointer-events-none text-foreground whitespace-nowrap overflow-hidden">

        {/* Elysuim Team (tl) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[0].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "a inline-block" : "b inline-block"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Kashish (tl1) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[1].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "aone inline-block text-primary" : "bone inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Guneet (tl2) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[2].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "atwo inline-block text-primary" : "btwo inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Ishani (tl3) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[3].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "athree inline-block text-primary" : "bthree inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Shambhavi (tl4) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[4].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "afour inline-block text-primary" : "bfour inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Tanishk (tl5) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[5].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "afive inline-block text-primary" : "bfive inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Akshit (tl6) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[6].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "asix inline-block text-primary" : "bsix inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {/* Aarav (tl7) */}
        <div className="absolute overflow-hidden flex font-display font-bold mb-6 text-glow-gold">
          {teamdetail[7].Name.split("").map((char, index, arr) => {
            const half = Math.ceil(arr.length / 2);
            return (
              <span
                key={index}
                className={index < half ? "aseven inline-block text-primary" : "bseven inline-block text-primary"}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeCard && (
          <>
            {/* Overlay - click outside closes */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
            />

            {/* Card */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="relative bg-black/50 backdrop-blur-md border border-primary/50 rounded-3xl p-6 w-[400px] pointer-events-auto  animate-glow-pulse">
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
                <img src={activeCard.img} className="h-[300px] w-full object-cover rounded-xl" />
                <div className="w-full flex mt-5 mb-3">
                  <div className="w-[60%]">
                    <h2 className="text-2xl font-extrabold text-white">
                      {activeCard.fname}
                    </h2>
                    <p className="text-primary font-bold">
                      {activeCard.position}
                    </p>
                  </div>
                  <div className="flex justify-between items-start w-[40%] gap-2">
                    <div className="h-10 w-10 bg-[#15151F] rounded-xl"><a href={`tel:${activeCard.contact}`} className="h-full w-full flex justify-center items-center text-white"><i class="fa-solid fa-phone text-xl text-white"></i></a></div>
                    <div className="h-10 w-10 bg-[#15151F] rounded-xl"><a href={`${activeCard.linkedin}`} className="h-full w-full flex justify-center items-center text-white"><i class="fa-brands fa-linkedin-in text-xl text-white"></i></a></div>
                    <div className="h-10 w-10 bg-[#15151F] rounded-xl"><a href={`${activeCard.instagram}`} className="h-full w-full flex justify-center items-center text-white"><i class="fa-brands fa-instagram text-xl text-white"></i></a></div>
                  </div>

                </div>
                <div>
                  <p className="text-grey-200 text-sm leading-relaxed">{activeCard.discreption}</p>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Team;

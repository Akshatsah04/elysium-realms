import { motion } from 'framer-motion';

const socialLinks = [
    { id: 'register', name: 'Register Now', url: 'https://docs.google.com/forms/d/17JyODAtgVXvShctfhLuNT0yUQ9w_3xzd1uc6SmBmduY/edit', icon: 'fa-solid fa-ticket' },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/company/elysium-25/posts/?feedView=all', icon: 'fa-brands fa-linkedin-in' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/ieee.wiemuj/?hl=en', icon: 'fa-brands fa-instagram' },
];

const Links = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed right-4 md:right-8 top-[50%] -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-end"
        >
            {socialLinks.map((link) => (
                <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-row-reverse items-center gap-3 transition-all duration-300 text-muted-foreground hover:text-primary/70"
                    whileHover={{ x: -5 }}
                >
                    <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-muted-foreground/30 rounded-sm transition-all duration-300 text-xl group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:text-glow-gold backdrop-blur-sm">
                        <i className={link.icon}></i>
                    </span>
                    <span className="text-sm tracking-widest uppercase font-display opacity-0 group-hover:opacity-100 transition-all duration-300 text-right">
                        {link.name}
                    </span>
                </motion.a>
            ))}
        </motion.div>
    );
};

export default Links;

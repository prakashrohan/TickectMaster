import React from "react";
import { motion } from "framer-motion";

const Card = ({ image, name, description, reverse }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative flex ${reverse ? "flex-row-reverse" : "flex-row"} items-center gap-8 p-8 rounded-2xl shadow-xl`}
        >
            {/* Event Image */}
            <motion.div className="relative">
                <motion.img
                    src={image}
                    className="w-72 h-96 object-cover rounded-2xl opacity-90 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ amount: 0.3 }}
                />
                {/* Capsule Label - Half inside & half outside image */}
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-md text-lg font-semibold">
                    {name}
                </div>
            </motion.div>

            {/* Card Text Content */}
            <div className="flex-1">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-4"
                >
                    {name}
                </motion.h2>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-gray-300 text-lg leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>
        </motion.div>
    );
};

const CardList = () => {
    const categories = [
        {
            name: "Concert",
            image: "test.avif",
            description: "Experience electrifying live music performances by your favorite artists. From rock bands to pop sensations, immerse yourself in an unforgettable night of beats, lights, and energy!"
        },
        {
            name: "Sports",
            image: "basketballl.jpeg",
            description: "Watch adrenaline-pumping action as top athletes compete in thrilling matches. From football finals to basketball playoffs, get ready for a stadium experience like never before!"
        },
        {
            name: "Theater",
            image: "threa.avif",
            description: "Step into the world of drama and storytelling. Witness mesmerizing performances, gripping scripts, and breathtaking stage designs that bring stories to life."
        },
        {
            name: "Family",
            image: "carnival.avif",
            description: "Create unforgettable memories with your loved ones at family-friendly events! Enjoy carnivals, circus performances, theme park specials, and kids' entertainment."
        },
    ];

    return (
        <div className="flex flex-col px-32 md:px-60 mt-10 space-y-16">
            {categories.map((category, index) => (
                <Card
                    key={index}
                    image={category.image}
                    name={category.name}
                    description={category.description}
                    reverse={index % 2 !== 0}
                />
            ))}
        </div>
    );
};

export default CardList;

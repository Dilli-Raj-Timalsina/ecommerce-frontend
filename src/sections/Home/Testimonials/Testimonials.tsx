import Testimonial from "@/components/Testimonial";
import styles from "./styles.module.css";

const testimonials = [
    {
        image: "/images/TEST.png",
        date: new Date(),
        name: "Ritika Shrestha",
        description: "Best Place to buy Nepali Masala.",
    },
    {
        image: "/images/TEST.png",
        date: new Date(),
        name: "Isha Rana",
        description: "Tihar ko lagi luga shopping gareko, asadhyei manparyo.",
    },
    {
        image: "/images/TEST.png",
        date: new Date(),
        name: "Ravi Bhandari",
        description: "Eta ko Khasi ko masu best cha.",
    },
    {
        image: "/images/TEST.png",
        date: new Date(),
        name: "Gopi",
        description: "Best Place to buy Nepali Masala.",
    },
    {
        image: "/images/TEST.png",
        date: new Date(),
        name: "Shuvam Shrestha",
        description: "Tihar ko lagi luga shopping gareko, asadhyei manparyo.",
    },
];

export default function Testimonials() {
    return (
        <div
            className="w-screen h-100"
            style={{
                backgroundImage: `url('/images/budda.jpg')`,
                backgroundRepeat: "no-repeat",
            }}
        >
            <h1
                className="text-base-100 text-center pt-10 text-4xl"
                style={{ backgroundColor: "#0006" }}
            >
                What Our Customers Say
            </h1>
            <div
                className="h-full w-screen relative overflow-hidden items-center grid"
                style={{ backgroundColor: "#000" }}
            >
                <div className={`${styles.testimonial} flex gap-4 lg:p-10`}>
                    {testimonials &&
                        Object(testimonials).map((testimonial: any, i: any) => {
                            return (
                                <div
                                    key={i}
                                    className={`${styles.testimonialItem} flex items-center`}
                                >
                                    <Testimonial
                                        image={testimonial.image}
                                        date={testimonial.date}
                                        name={testimonial.name}
                                        description={testimonial.description}
                                    />
                                </div>
                            );
                        })}

                    {testimonials &&
                        Object(testimonials).map((testimonial: any, i: any) => {
                            return (
                                <div
                                    key={i}
                                    className={`${styles.testimonialItem} flex items-center`}
                                >
                                    <Testimonial
                                        image={testimonial.image}
                                        date={testimonial.date}
                                        name={testimonial.name}
                                        description={testimonial.description}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

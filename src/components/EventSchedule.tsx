import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin } from "lucide-react";

interface ScheduleEvent {
  time: string;
  event: string;
  venue: string;
}

interface DaySchedule {
  day: string;
  date: string;
  location: string;
  events: ScheduleEvent[];
}

const schedule: DaySchedule[] = [
  {
    day: "Day 1",
    date: "6th February 2026",
    location: "Agnel Polytechnic Vashi",
    events: [
      {
        time: "9:00 AM",
        event: "Inauguration and Banner Drop",
        venue: "Polytechnic Foyer",
      },
      {
        time: "11:00 AM",
        event: "Rangoli Competition",
        venue: "Polytechnic Foyer",
      },
      {
        time: "Both Days",
        event: "Photography & Reel Contest",
        venue: "College Campus",
      },
      {
        time: "12:30 PM",
        event: "Treasure Hunt",
        venue: "Polytechnic Building",
      },
      { time: "1:00 PM", event: "Pot Painting", venue: "Drawing Hall" },
      {
        time: "3:00 PM",
        event: "Singing (Solo / Duet / Group)",
        venue: "On Stage Event",
      },
      {
        time: "3:00 PM",
        event: "Street Play",
        venue: "On Stage Event",
      },
      {
        time: "3:00 PM",
        event: "Dance (Solo & Group)",
        venue: "On Stage Event",
      },
      {
        time: "3:00 PM",
        event: "Rank Holders Felicitation",
        venue: "On Stage Event",
      },
    ],
  },
  {
    day: "Day 2",
    date: "7th February 2026",
    location: "Agnel Polytechnic Vashi",
    events: [
      { time: "1:00 PM", event: "Debate", venue: "Seminar Hall" },
      {
        time: "2:00 PM",
        event: "Flashmob",
        venue: "Polytechnic Foyer",
      },
      {
        time: "3:00 PM",
        event: "Singing (Solo / Duet / Group)",
        venue: "On Stage Event",
      },
      {
        time: "3:00 PM",
        event: "Street Play",
        venue: "On Stage Event",
      },
      {
        time: "3:00 PM",
        event: "Dance (Solo & Group)",
        venue: "On Stage Event",
      },
      { time: "3:00 PM", event: "Fashion Show", venue: "On Stage Event" },
      { time: "3:00 PM", event: "Prize Distribution", venue: "On Stage Event" },
      { time: "3:00 PM", event: "DJ Night", venue: "On Stage Event" },
    ],
  },
];

const EventSchedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-crimson-deep/10 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Event Schedule
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Agnel Polytechnic Vashi
          </p>
        </motion.div>

        {/* Side by Side Schedule */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {schedule.map((daySchedule, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: dayIndex * 0.2 }}
            >
              <div className="glass-card p-8 md:p-10 border-secondary/20 h-full">
                <h3 className="font-display text-2xl font-bold text-secondary mb-1 text-center">
                  {daySchedule.day}
                </h3>
                <p className="text-center text-secondary/70 font-body text-sm mb-2">
                  {daySchedule.date}
                </p>
                <p className="text-center text-secondary/60 font-body text-xs mb-6 pb-6 border-b border-secondary/20">
                  {daySchedule.location}
                </p>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-secondary via-crimson-glow to-secondary opacity-30" />

                  <div className="space-y-5">
                    {daySchedule.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: dayIndex * 0.2 + eventIndex * 0.08,
                        }}
                        className="flex items-start gap-3 group"
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10 w-4 h-4 rounded-full bg-secondary border-2 border-background mt-1.5 group-hover:scale-125 transition-transform flex-shrink-0" />

                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-1">
                            <div className="flex items-center gap-1 text-secondary font-body font-medium min-w-fit">
                              <Clock size={14} className="flex-shrink-0" />
                              <span className="text-xs font-semibold">
                                {event.time}
                              </span>
                            </div>
                          </div>
                          <h4 className="font-display font-semibold text-foreground text-sm mb-1">
                            {event.event}
                          </h4>
                          <div className="flex items-center gap-1.5 text-foreground/70 font-body text-xs ml-5">
                            <MapPin size={12} className="flex-shrink-0" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;

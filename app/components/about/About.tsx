import { type Education } from '@/actions/education.actions';
import { type Profile } from '@/actions/profile.actions';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import AboutDialog from './AboutDialog';

interface AboutProps {
  profile: Profile;
  education: Education[];
}

const About = ({ profile, education }: AboutProps) => {
  const [lede] = profile.about;

  return (
    <Section id="about">
      <div className="grid gap-8 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:gap-16">
        <div>
          <SectionHeading title="About" className="mb-[1.2rem]" />
          <p className="mb-[1.6rem] text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.25] font-medium tracking-[-0.015em]">
            {lede}
          </p>
          <AboutDialog name={profile.name} paragraphs={profile.about} />
        </div>
        <ul className="grid content-start gap-[0.9rem]">
          {education.map(entry => (
            <li
              key={entry.id}
              className="flex items-start gap-4 border-t border-line py-4"
            >
              <b className="min-w-24 text-[0.95rem] font-semibold text-brand-1">
                {entry.fromYear} – {entry.toYear}
              </b>
              <span className="text-[0.95rem] text-muted-foreground">
                <strong className="block font-semibold text-foreground">
                  {entry.institution}
                </strong>
                {entry.qualification}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default About;

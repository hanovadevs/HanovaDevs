import { company } from './company.js'
import { leadershipTeam } from './leadership.js'

const profiles = {
  'ali-haider': {
    intro: 'A useful digital product starts with a clear purpose. Ali’s leadership connects the business behind an idea with the people, priorities and decisions needed to move it forward.',
    headline: 'Clear direction. Useful software.',
    approach: 'Start with the problem, understand the people it affects, and define what a useful next step looks like. Company strategy and product decisions should stay connected to that purpose.',
    contributions: [
      ['Company direction', 'Defining the company’s focus and keeping its work connected to the needs of the businesses it serves.'],
      ['Business strategy', 'Connecting a business idea with priorities, a realistic scope and a direction the team can explain.'],
      ['Product thinking', 'Bringing customer needs and everyday workflows into conversations about websites, software and the company’s own products.'],
    ],
    questions: [
      ['Who is Ali Haider at HanovaDevs?', 'Ali Haider is the founder and CEO of HanovaDevs. He founded the company in 2022 and leads its company direction and business strategy.'],
      ['When did Ali Haider found HanovaDevs?', 'Ali Haider founded HanovaDevs in 2022. The company’s founding year is separate from the joining dates of individual team members.'],
      ['What does the founder and CEO focus on?', 'Ali’s role focuses on company direction, business strategy and connecting ideas with useful software. Project scope, responsibilities and delivery arrangements are agreed with the team.'],
      ['Where can I learn more about Ali Haider?', 'Ali’s personal website is ali.hanovadevs.com. This company profile and the About page describe his role at HanovaDevs.'],
      ['Which products does HanovaDevs develop?', 'HanovaDevs develops Eunoia, available on Microsoft Store, and Omnai Browser, which is preparing for launch. Their product pages describe current availability and direction.'],
    ],
  },
  'hira-maqsood': {
    intro: 'Original thinking is most valuable when it becomes a clear plan. Hira brings a creative perspective to business challenges and helps turn ideas into priorities the team can work with.',
    headline: 'Creative ideas. Thoughtful plans.',
    approach: 'Explore the possibilities, then bring them into focus. A creative direction becomes useful when people understand the priorities, the decisions to make and the next steps to take.',
    contributions: [
      ['Original ideas', 'Exploring fresh approaches to a business need, connecting possibilities and shaping a useful direction for discussion.'],
      ['Strategic planning', 'Helping turn that direction into clear priorities, a defined scope and practical next steps.'],
      ['Operations & delivery', 'Coordinating the people and decisions that keep ideas connected to day-to-day work.'],
    ],
    questions: [
      ['Who is Hira Maqsood at HanovaDevs?', company.coFounder.description],
      ['What does COO mean in Hira’s title?', 'COO stands for Chief Operating Officer. Hira’s role connects strategic planning with operations and project delivery.'],
      ['What does Hira Maqsood focus on?', 'Hira focuses on original ideas, creative problem-solving, strategic planning, business operations and project delivery. She helps connect the team’s ideas with clear priorities and practical plans.'],
      ['How does creative planning support a project?', 'Creative planning explores useful possibilities before defining a direction. Clear priorities and scope help the team turn that direction into work that can be reviewed and delivered.'],
      ['Is Hira Maqsood a co-founder of HanovaDevs?', 'Yes. Hira Maqsood is the co-founder and Chief Operating Officer of HanovaDevs. Her role connects original ideas and strategic planning with operations and delivery.'],
    ],
  },
  'noor-fatima': {
    intro: 'A strong brand makes a company easier to understand. Noor’s marketing role brings audience needs, clear messaging and consistent presentation into the way HanovaDevs communicates its work.',
    headline: 'A clear brand. A meaningful connection.',
    approach: 'Make the message useful to the person reading it. Brand and marketing decisions should help people understand an offering, recognise its relevance and choose an appropriate next step.',
    contributions: [
      ['Brand direction', 'Helping connect the company’s identity with the way its services and products are presented.'],
      ['Clear communication', 'Shaping audience-focused messaging that makes an offering easier to understand.'],
      ['Marketing alignment', 'Connecting brand and growth priorities with the company’s design, product and business direction.'],
    ],
    questions: [
      ['Who is Noor Fatima at HanovaDevs?', 'Noor Fatima is the Chief Marketing Officer, or CMO, of HanovaDevs. Her role focuses on brand direction, marketing communication and audience connection.'],
      ['What does CMO stand for?', 'CMO stands for Chief Marketing Officer, a leadership role focused on marketing and brand direction.'],
      ['What does Noor’s marketing role focus on?', 'Her focus is brand direction, clear communication and aligning marketing with the company’s offering and audience. A shared message helps people understand the services and products that are relevant to them.'],
      ['How does marketing connect with software and design?', 'Marketing helps clarify the audience and message. Design and engineering turn that context into a usable digital experience. The work benefits from a shared brief and clear priorities.'],
      ['Is the image on Noor Fatima’s profile a photograph?', 'No. It is an AI-generated faceless illustration used as a placeholder. It does not depict Noor’s actual appearance or claim to be a photograph of her.'],
    ],
  },
  'faizan-javed': {
    intro: 'Good engineering makes an idea usable and maintainable. Faizan’s technology role connects the requirements of a project with technical decisions the team can review, implement and support.',
    headline: 'Thoughtful engineering. Practical decisions.',
    approach: 'Choose technology around the problem, not the other way around. A clear understanding of requirements, dependencies and testing conditions supports decisions that a team can maintain.',
    contributions: [
      ['Technical direction', 'Connecting project requirements with a suitable architecture and implementation approach.'],
      ['Engineering decisions', 'Considering integration needs, constraints and maintainability when selecting tools and technical patterns.'],
      ['Quality & handover', 'Keeping testing, documentation and support requirements part of the engineering conversation.'],
    ],
    questions: [
      ['Who is Faizan Javed at HanovaDevs?', 'Faizan Javed is the Chief Technology Officer, or CTO, of HanovaDevs. His role focuses on technical direction and software engineering decisions.'],
      ['What does CTO stand for?', 'CTO stands for Chief Technology Officer, a leadership role concerned with technology direction and engineering.'],
      ['How are technology choices made for a project?', 'Technology choices should follow project requirements, integration needs, operating constraints and maintainability. The team agrees the implementation approach during scoping.'],
      ['Does the technical approach include testing?', 'Testing and handover requirements belong in the project scope. The relevant workflows, acceptance conditions and support arrangements are agreed before delivery.'],
      ['Can I ask about a technical project?', 'Yes. Send the company your goals, existing tools and constraints through the Contact page. The team can discuss the scope and an appropriate technical next step.'],
    ],
  },
}

export const leadershipProfiles = leadershipTeam.map(member => ({ ...member, ...profiles[member.id] }))

export function leadershipFaqs(member) {
  return [
    ...member.questions.map(([question, answer]) => ({ question, answer })),
    { question: `How can I contact ${member.name} about a project?`, answer: 'Use the HanovaDevs Contact page or email contact@hanovadevs.com. Include your goals and current constraints so the company can route your enquiry to the appropriate person. These are company enquiry channels, not personal contact details.' },
    { question: 'Who else is on the HanovaDevs leadership team?', answer: 'The leadership team includes Ali Haider, Founder & CEO; Hira Maqsood, Co-founder & COO; Noor Fatima, CMO; and Faizan Javed, CTO. Their individual profiles are linked from the About page.' },
  ]
}

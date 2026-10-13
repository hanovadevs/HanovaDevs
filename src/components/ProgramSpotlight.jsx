import { Link } from 'react-router-dom'
import { builderProgram } from '../data/programOverview'
import './ProgramSpotlight.css'

export default function ProgramSpotlight() {
  return <aside className="program-spotlight" aria-label="Student Builder Program"><div className="container program-spotlight__inner"><div><span>Our student builder community</span><h2>From learning concepts to building with a team.</h2><p>{builderProgram.cohort} · {builderProgram.duration}. Meet the builders, their mentors, and the journey we are sharing.</p></div><Link to={builderProgram.path}>Explore the Student Builder Program</Link></div></aside>
}

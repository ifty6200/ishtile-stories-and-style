import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";

export const Route = createFileRoute("/editorial")({
  head: () => ({ meta: [
    { title: "Editorial — ISHTILE Journal" },
    { name: "description", content: "Fashion, culture and beyond. Stories and ideas from the ISHTILE universe." },
  ]}),
  component: EditorialPage,
});
const photo=(id:string,w=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const stories=[
 {title:"The New Generation of Fashion",date:"Nov 12, 2024",category:"Perspective",image:photo("photo-1529139574466-a303027c1d8b",900),slug:"the-new-generation-of-fashion"},
 {title:"Beyond the Runway",date:"Nov 08, 2024",category:"Culture",image:photo("photo-1509631179647-0177331693ae",900),slug:"beyond-the-runway"},
 {title:"Culture in Contemporary Fashion",date:"Nov 01, 2024",category:"Journal",image:photo("photo-1515886657613-9f3515b0c78f",900),slug:"culture-in-contemporary-fashion"},
];
function EditorialPage(){
 return <main className="editorial-page">
r>
  <section className="editorial-hero">
   <div className="editorial-hero-copy"><p className="eyebrow">THE ISHTILE JOURNAL</p><h1>Editorial.</h1><p>Fashion, culture and<br/>beyond.</p><a href="#stories">Explore Articles <ArrowRight size={16}/></a></div>
   <div className="editorial-hero-image"><img src={photo("photo-1539570515001-5f6c3c3f7b4d",1800)} alt="Fashion editorial campaign in vivid blue"/></div>
   <span className="editorial-mark">✳</span>
  </section>
  <section className="editorial-stories" id="stories">
   {stories.map((story,i)=><Link to="/discover/$type/$slug" params={{type:"story",slug:story.slug}} className="editorial-story-card" key={story.slug}>
    <div className="editorial-story-image"><img src={story.image} alt={story.title}/><span>0{i+1}</span></div>
    <div className="editorial-story-meta"><span>{story.category}</span><span>ISHTILE JOURNAL</span></div>
    <h2>{story.title}</h2><p>{story.date}</p><b>READ STORY <ArrowUpRight size={14}/></b>
   </Link>)}
  </section>
  <footer className="editorial-page-footer"><Link to="/">ISHTILE<span>✦</span></Link><span>DISCOVER BEYOND LABELS.</span><Link to="/">BACK TO THE UNIVERSE <ArrowRight size={14}/></Link></footer>
 </main>;
}

'use client'
import { useState } from "react";
import { supabase } from '../lib/supabase'
const cream = "#F5F2ED";
const black = "#0E0E0E";
const muted = "#9A9690";
const border = "#E2DDD7";
const white = "#FFFFFF";
const gold = "#B89A6A";

const G = {
  fontSerif: "'Georgia', 'Times New Roman', serif",
  fontSans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
body{background:${cream};color:${black};font-family:'Inter',sans-serif;font-weight:300}

.ef{font-family:'EB Garamond',serif}

@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.a0{animation:up .55s ease both}
.a1{animation:up .55s .1s ease both;opacity:0}
.a2{animation:up .55s .22s ease both;opacity:0}
.a3{animation:up .55s .34s ease both;opacity:0}
.a4{animation:up .55s .46s ease both;opacity:0}

/* NAV */
.nav{position:sticky;top:0;z-index:999;background:${cream};border-bottom:1px solid ${border};
  display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:60px}
.nav-logo{font-family:'EB Garamond',serif;font-size:22px;font-weight:400;letter-spacing:.22em;cursor:pointer;color:${black}}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links li{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;color:${muted};transition:color .2s}
.nav-links li:hover{color:${black}}
.nav-right{display:flex;gap:16px;align-items:center}

/* ANNOUNCE BAR */
.ann{background:${black};color:${cream};text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;padding:10px;font-weight:500}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;border:none;font-family:'Inter',sans-serif;font-weight:500;letter-spacing:.09em;text-transform:uppercase;font-size:10px}
.btn-blk{background:${black};color:${cream};padding:13px 32px}
.btn-blk:hover{background:#222}
.btn-out{background:transparent;color:${black};border:1px solid ${black};padding:12px 28px}
.btn-out:hover{background:${black};color:${cream}}
.btn-ghost{background:none;border:none;color:${muted};font-size:11px;cursor:pointer;font-family:'Inter',sans-serif;letter-spacing:.04em;transition:color .2s}
.btn-ghost:hover{color:${black}}

/* MATCH BADGE */
.badge{background:${black};color:${cream};font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:5px 10px;display:inline-block}
.badge-gold{background:${gold};color:${white}}
.pill{display:inline-block;background:#EAE7E0;color:#6B6760;font-size:9px;font-weight:500;letter-spacing:.09em;text-transform:uppercase;padding:5px 11px}

/* INPUTS */
.inp{width:100%;border:1px solid ${border};background:${white};padding:12px 14px;font-family:'Inter',sans-serif;font-size:13px;font-weight:300;outline:none;transition:border .2s;color:${black}}
.inp:focus{border-color:${black}}
.inp::placeholder{color:#BDB9B3}

/* QUIZ OPT */
.qopt{width:100%;text-align:left;background:${white};border:1px solid ${border};padding:16px 20px;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;color:${black}}
.qopt:hover{border-color:${black}}
.qopt.on{border-color:${black};background:#F0ECE5}

/* BARS */
.bar-t{height:1px;background:#D6D2CB;margin:4px 0 2px}
.bar-f{height:1px;background:${black};transition:width .6s ease}

/* CARDS */
.pcard{background:${white};border:1px solid ${border};cursor:pointer;transition:all .3s}
.pcard:hover{border-color:#B0ABA4}
.rcard{background:${white};border:1px solid ${border};padding:24px 28px}

/* TAB */
.tab{background:none;border:none;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;letter-spacing:.11em;text-transform:uppercase;padding:14px 20px 16px;cursor:pointer;color:#B0ABA4;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s}
.tab.on{color:${black};border-bottom-color:${black}}

/* PROFILE SIDEBAR */
.sidebar{background:${black};color:${cream};padding:24px;border-radius:0;font-family:'Inter',sans-serif}
.sidebar-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#666;margin-bottom:4px}
.sidebar-val{font-size:13px;font-weight:400;margin-bottom:16px}

/* FIT SCORE POPUP */
.score-pop{background:${white};border:1px solid ${border};padding:20px 24px;display:inline-block}

/* STARS */
.stars{color:${gold};font-size:12px;letter-spacing:1px}

/* RATING ROW */
.rat-row{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid ${border}}

/* DIVIDER */
.dv{height:1px;background:${border}}

/* SECTION LABEL */
.sec-lab{font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${muted};margin-bottom:20px;display:block}

::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:${cream}}
::-webkit-scrollbar-thumb{background:${border}}
`;

const PRODUCTS = [
  {id:1,name:"Relaxed Wool Sweater",brand:"COS",price:"$248",cat:"Knitwear",
   img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&crop=top",
   fit:4.6,qual:4.8,comf:4.7,n:128,match:94,
   note:"True to size. Slim builds report a clean, non-boxy drape at size S."},
  {id:2,name:"90s Straight Jean",brand:"AGOLDE",price:"$198",cat:"Denim",
   img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=750&fit=crop&crop=top",
   fit:4.3,qual:4.9,comf:4.5,n:96,match:99,
   note:"High-rise cut. 5'2\"–5'5\" petite shapes suggest hemming 1.5 inches."},
  {id:3,name:"Supima Cotton Tee",brand:"UNIQLO",price:"$29",cat:"Tops",
   img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop&crop=top",
   fit:4.7,qual:4.9,comf:5.0,n:214,match:91,
   note:"Slightly fitted. Athletic builds love the shoulder seam placement."},
  {id:4,name:"Effortless Wide Pant",brand:"ARITZIA",price:"$148",cat:"Trousers",
   img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&crop=top",
   fit:4.5,qual:4.7,comf:4.8,n:183,match:88,
   note:"Runs long. Under 5'4\" should size down or hem to avoid pooling."},
];

const REVIEWS = [
  {user:"brooke_m",ht:"5'2\"",bt:"Slim",fp:"Regular",fit:5,ql:5,cf:5,txt:"Finally a review from someone my height. Fits exactly as described — no guessing.",h:47},
  {user:"claire_v",ht:"5'3\"",bt:"Slim",fp:"Regular",fit:4,ql:5,cf:5,txt:"Quality is stunning. I sized up per the recommendation and it's perfect.",h:31},
  {user:"jess_t",ht:"5'5\"",bt:"Athletic",fp:"Oversized",fit:3,ql:5,cf:4,txt:"For an oversized look, size up. The 'regular' fit runs quite fitted on an athletic build.",h:28},
];

const HT = {under_61:"Under 5'1\"","61_63":"5'1\"–5'3\"","64_66":"5'4\"–5'6\"","67_69":"5'7\"–5'9\"","70_plus":"5'10\"+",};

function Star({n=5}){return <span className="stars">{"★".repeat(n)}{"☆".repeat(5-n)}</span>}

function Nav({view,setView,user}){
  return <>
    <div className="ann">Trusted by 5,000+ members · Powered by real fit data</div>
    <nav className="nav">
      <span className="nav-logo" onClick={()=>setView("landing")}>FORMA</span>
      <ul className="nav-links">
        {["Discover","Reviews","Brands","Community","How It Works"].map(l=><li key={l}>{l}</li>)}
      </ul>
      <div className="nav-right">
        {user
          ? <span style={{fontSize:12,fontWeight:500,letterSpacing:".04em"}}>{user.name}</span>
          : <>
              <button className="btn-ghost" onClick={()=>setView("auth")}>Log in</button>
              <button className="btn btn-blk" onClick={()=>setView("auth")}>Get Started</button>
            </>}
      </div>
    </nav>
  </>;
}

function Landing({onStart,onLogin}){
  return <div>
    {/* HERO */}
    <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"86vh",background:cream}}>
      <div style={{padding:"80px 64px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <span className="sec-lab a0" style={{marginBottom:28}}>Fit Intelligence Platform</span>
        <h1 className="ef a1" style={{fontSize:80,fontWeight:400,lineHeight:1,marginBottom:32,letterSpacing:"-.01em"}}>
          Clothes that<br />actually fit<br /><em style={{color:gold}}>you.</em>
        </h1>
        <p className="a2" style={{fontSize:14,color:muted,lineHeight:1.9,maxWidth:360,marginBottom:48,fontWeight:300}}>
          Real fit data from real people. Find clothing that fits your body, your style, and your life.
        </p>
        <div className="a3" style={{display:"flex",gap:12,alignItems:"center",marginBottom:48}}>
          <button className="btn btn-blk" onClick={onStart}>Create Your Profile</button>
          <button className="btn btn-out" onClick={onLogin}>Explore Clothing</button>
        </div>
        <div className="a4" style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{display:"flex"}}>
            {["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face"
             ].map((src,i)=><img key={i} src={src} style={{width:28,height:28,borderRadius:"50%",border:`2px solid ${cream}`,marginLeft:i?-8:0,objectFit:"cover"}} alt=""/>)}
          </div>
          <div>
            <Star n={5}/>
            <div style={{fontSize:11,color:muted,marginTop:2}}>5,000+ members building the most trusted fit database</div>
          </div>
        </div>
      </div>

      <div style={{position:"relative",overflow:"hidden",background:cream}}>
        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=900&fit=crop&crop=top"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}} alt=""/>
        {/* App card overlay */}
        <div style={{position:"absolute",bottom:48,right:36,background:white,border:`1px solid ${border}`,padding:"20px 24px",width:220,boxShadow:"0 20px 60px rgba(0,0,0,.09)"}}>
          <div style={{fontSize:9,fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",color:muted,marginBottom:16}}>Your Fit Profile</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              {[["Height","5'7\""],["Body Type","Athletic"],["Fit Pref.","Regular"]].map(([l,v])=><div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:9,color:muted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:2}}>{l}</div>
                <div style={{fontSize:13,fontWeight:500}}>{v}</div>
              </div>)}
            </div>
            <div style={{width:48,height:80,background:cream,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="24" height="52" viewBox="0 0 24 52" fill="none">
                <ellipse cx="12" cy="5" rx="5" ry="5" fill={border}/>
                <rect x="7" y="12" width="10" height="22" rx="1" fill={border}/>
                <rect x="6" y="35" width="5" height="16" rx="1" fill={border}/>
                <rect x="13" y="35" width="5" height="16" rx="1" fill={border}/>
                <rect x="1" y="14" width="5" height="14" rx="1" fill={border}/>
                <rect x="18" y="14" width="5" height="14" rx="1" fill={border}/>
              </svg>
            </div>
          </div>
          <div style={{borderTop:`1px solid ${border}`,paddingTop:12,marginTop:4}}>
            <div style={{fontSize:9,color:muted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>Recommended for you</div>
            <div style={{display:"flex",gap:6}}>
              {PRODUCTS.slice(0,2).map(p=><img key={p.id} src={p.img} style={{width:52,height:64,objectFit:"cover",border:`1px solid ${border}`}} alt=""/>)}
            </div>
          </div>
          <div style={{marginTop:12,background:"#F8F5F0",padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:9,color:muted,letterSpacing:".08em",textTransform:"uppercase"}}>Match Accuracy</span>
            <span className="ef" style={{fontSize:18,fontWeight:400}}>95%</span>
          </div>
        </div>
      </div>
    </section>

    <div className="dv"/>

    {/* BRAND LOGOS */}
    <section style={{padding:"32px 64px",background:white}}>
      <div style={{fontSize:9,fontWeight:500,letterSpacing:".18em",textTransform:"uppercase",color:muted,textAlign:"center",marginBottom:28}}>Trusted by people. Powered by data.</div>
      <div style={{display:"flex",justifyContent:"center",gap:56,alignItems:"center",flexWrap:"wrap"}}>
        {["ZARA","COS","NIKE","UNIQLO","ARITZIA","LULULEMON","ASOS"].map(b=><span key={b} style={{fontSize:13,fontWeight:500,letterSpacing:".12em",color:"#BBB7B0"}}>{b}</span>)}
      </div>
    </section>

    <div className="dv"/>

    {/* 3 FEATURES */}
    <section style={{padding:"80px 64px",background:cream}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
        {[
          {icon:"◎",title:"Body-based matching",sub:"We match clothing to your body type, height, and fit preference."},
          {icon:"◈",title:"Real people, real reviews",sub:"Structured fit reviews from people with similar bodies to yours."},
          {icon:"◆",title:"Fit intelligence",sub:"AI-powered insights so you can shop with total confidence."},
        ].map((f,i)=><div key={i} style={{background:white,border:`1px solid ${border}`,padding:"40px 36px"}}>
          <div style={{fontSize:22,color:gold,marginBottom:20}}>{f.icon}</div>
          <div className="ef" style={{fontSize:22,fontWeight:400,marginBottom:12}}>{f.title}</div>
          <div style={{fontSize:13,color:muted,lineHeight:1.8,fontWeight:300}}>{f.sub}</div>
        </div>)}
      </div>
    </section>

    <div className="dv"/>

    {/* SEE WHAT FITS */}
    <section style={{padding:"80px 64px",background:cream,display:"grid",gridTemplateColumns:"280px 1fr",gap:64,alignItems:"start"}}>
      <div>
        <span className="sec-lab">Personalized Discovery</span>
        <h2 className="ef" style={{fontSize:52,fontWeight:400,lineHeight:1.05,marginBottom:20}}>See what fits you.</h2>
        <p style={{fontSize:14,color:muted,lineHeight:1.85,marginBottom:36,fontWeight:300}}>Filter by your body profile to discover clothes that are more likely to fit — before you buy.</p>
        <button className="btn btn-blk" style={{marginBottom:16}} onClick={onStart}>Create Your Profile</button>
        <div><button className="btn-ghost" style={{fontSize:11,letterSpacing:".08em",textDecoration:"underline"}} onClick={()=>{}}>How it works →</button></div>
      </div>
      <div>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {[["Height","5'6\"–5'8\""],["Body Type","Athletic"],["Fit Pref.","Regular"]].map(([l,v])=><div key={l} style={{background:white,border:`1px solid ${border}`,padding:"9px 14px",display:"flex",alignItems:"center",gap:8,fontSize:12}}>
            <span style={{color:muted,fontSize:10,letterSpacing:".08em",textTransform:"uppercase"}}>{l}:</span>
            <span style={{fontWeight:500}}>{v}</span>
            <span style={{color:muted,fontSize:10,marginLeft:4}}>▾</span>
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {PRODUCTS.slice(0,3).map(p=><div key={p.id} className="pcard" onClick={()=>{}}>
            <div style={{position:"relative"}}>
              <img src={p.img} style={{width:"100%",height:200,objectFit:"cover",display:"block"}} alt=""/>
              <span className="badge" style={{position:"absolute",bottom:10,left:10}}>{p.match}% MATCH</span>
            </div>
            <div style={{padding:"14px 16px"}}>
              <div style={{fontSize:9,color:muted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>{p.brand}</div>
              <div style={{fontSize:13,fontWeight:500,marginBottom:6}}>{p.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Star n={Math.round(p.fit)}/>
                <span style={{fontSize:10,color:muted}}>{p.fit} ({p.n})</span>
              </div>
              <div style={{marginTop:8}}><span className="badge-gold badge" style={{fontSize:9}}>High Match</span></div>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* DARK CTA */}
    <section style={{background:black,color:cream,padding:"72px 64px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div>
        <h2 className="ef" style={{fontSize:58,fontWeight:400,lineHeight:1.05,marginBottom:12,color:cream}}>Stop guessing your size.<br />Start knowing your fit.</h2>
        <div style={{display:"flex",gap:48,marginTop:32}}>
          {[["250K+","Fit reviews"],["50K+","Products analyzed"],["95%","Match accuracy"]].map(([n,l])=><div key={l}>
            <div className="ef" style={{fontSize:36,fontWeight:400,color:cream,marginBottom:4}}>{n}</div>
            <div style={{fontSize:10,color:"#666",letterSpacing:".1em",textTransform:"uppercase"}}>{l}</div>
          </div>)}
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <button onClick={onStart} style={{background:cream,color:black,border:"none",padding:"15px 40px",fontFamily:"'Inter',sans-serif",fontWeight:500,fontSize:10,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",display:"block",marginBottom:10}}>Get Started</button>
        <div style={{fontSize:11,color:"#666"}}>It's free and only takes 1 minute.</div>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{background:cream,borderTop:`1px solid ${border}`,padding:"56px 64px 32px"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:32,marginBottom:48}}>
        <div>
          <div className="ef" style={{fontSize:26,fontWeight:400,marginBottom:12,letterSpacing:".12em"}}>FORMA</div>
          <div style={{fontSize:12,color:muted,lineHeight:1.8,maxWidth:220,fontWeight:300}}>The personalized fit intelligence platform for fashion.</div>
        </div>
        {[{t:"Discover",l:["New In","Knitwear","Denim","Tops"]},{t:"Community",l:["Write a Review","Top Reviewers","Guidelines"]},{t:"Company",l:["About","Press","Contact","Blog"]},{t:"Legal",l:["Privacy","Terms","Cookies"]}].map(c=><div key={c.t}>
          <div style={{fontSize:9,fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",marginBottom:16,color:black}}>{c.t}</div>
          {c.l.map(lk=><div key={lk} style={{marginBottom:10,fontSize:12,color:muted,cursor:"pointer",fontWeight:300}}>{lk}</div>)}
        </div>)}
      </div>
      <div style={{borderTop:`1px solid ${border}`,paddingTop:20,display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:11,color:"#C5C0BA"}}>© 2026 FORMA. All rights reserved.</span>
        <span style={{fontSize:11,color:"#C5C0BA"}}>Privacy · Terms</span>
      </div>
    </footer>
  </div>;
}

function Auth({ onAuth }) {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pw,
      });
      
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      onAuth({ name: name || email.split("@")[0], email });

    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pw,
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      onAuth({ name: email.split("@")[0], email });
    }
    setLoading(false);
  };

  return (
    <div className="a0" style={{minHeight:"82vh",display:"flex",alignItems:"center",justifyContent:"center",padding:40,background:cream}}>
      <div style={{maxWidth:440,width:"100%"}}>
        <span className="sec-lab">Welcome to FORMA</span>
        <h2 className="ef" style={{fontSize:52,fontWeight:400,marginBottom:8,lineHeight:1.05}}>
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h2>
        <p style={{fontSize:13,color:muted,marginBottom:40,fontWeight:300}}>
          {mode === "signup" ? "Start your personalized fit journey." : "Continue finding clothes that fit."}
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${border}`,marginBottom:32}}>
          {["signup","login"].map(m =>
            <button key={m} onClick={() => setMode(m)} style={{padding:"12px 8px",background:mode===m?black:"transparent",color:mode===m?cream:muted,border:"none",fontFamily:"'Inter',sans-serif",fontWeight:500,fontSize:10,cursor:"pointer",letterSpacing:".1em",textTransform:"uppercase",transition:"all .2s"}}>
              {m === "signup" ? "Create Account" : "Sign In"}
            </button>
          )}
        </div>
        <div style={{display:"grid",gap:10,marginBottom:20}}>
          {mode === "signup" && <input className="inp" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>}
          <input className="inp" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>
          <input className="inp" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)}/>
        </div>
        {errorMsg && <p style={{color:"red",fontSize:12,marginBottom:12}}>{errorMsg}</p>}
        <button className="btn btn-blk" style={{width:"100%",padding:15}} onClick={handleSubmit}>
          {loading ? "Please wait..." : mode === "signup" ? "Create Account & Take Quiz →" : "Sign In →"}
        </button>
      </div>
    </div>
  );
}


function Quiz({onComplete}){
  const [step,setStep]=useState(0);
  const [ans,setAns]=useState({height:null,bodyTypes:[],fitPref:null});
  const steps=[
    {q:"What's your height?",sub:"Matches you with reviews from people your exact size.",field:"height",type:"single",
     opts:[{l:"Under 5'1\"",v:"under_61"},{l:"5'1\" – 5'3\"",v:"61_63"},{l:"5'4\" – 5'6\"",v:"64_66"},{l:"5'7\" – 5'9\"",v:"67_69"},{l:"5'10\" and above",v:"70_plus"}]},
    {q:"How would you describe your build?",sub:"Select all that apply.",field:"bodyTypes",type:"multi",
     opts:[{l:"Slim / Straight",v:"slim"},{l:"Petite",v:"petite"},{l:"Athletic / Muscular",v:"athletic"},{l:"Curvy / Hourglass",v:"curvy"},{l:"Full-Figured",v:"broad"},{l:"Average",v:"average"}]},
    {q:"How do you like clothes to fit?",sub:"This makes recommendations accurate.",field:"fitPref",type:"single",
     opts:[{l:"Tight / Body-con",v:"tight"},{l:"Fitted / Regular",v:"regular"},{l:"Slightly Relaxed",v:"relaxed"},{l:"Oversized / Baggy",v:"oversized"}]},
  ];
  const cur=steps[step];
  const pct=((step+1)/steps.length)*100;
  const toggle=v=>{
    if(cur.type==="multi") setAns({...ans,bodyTypes:ans.bodyTypes.includes(v)?ans.bodyTypes.filter(x=>x!==v):[...ans.bodyTypes,v]});
    else setAns({...ans,[cur.field]:v});
  };
  const isSel=v=>cur.type==="multi"?ans.bodyTypes.includes(v):ans[cur.field]===v;
  const canNext=cur.type==="multi"?ans.bodyTypes.length>0:ans[cur.field]!==null;
  return <div className="a0" style={{minHeight:"82vh",display:"flex",alignItems:"center",justifyContent:"center",padding:40,background:cream}}>
    <div style={{maxWidth:520,width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:9,color:muted,letterSpacing:".14em",textTransform:"uppercase",fontWeight:500}}>Fit Profile Quiz</span>
        <span style={{fontSize:9,color:muted}}>{step+1} / {steps.length}</span>
      </div>
      <div className="bar-t"><div className="bar-f" style={{width:`${pct}%`}}/></div>
      <div style={{marginBottom:40,marginTop:40}}>
        <span className="sec-lab">Step {step+1}</span>
        <h2 className="ef" style={{fontSize:48,fontWeight:400,lineHeight:1.05,marginBottom:10}}>{cur.q}</h2>
        <p style={{fontSize:13,color:muted,fontWeight:300,lineHeight:1.7}}>{cur.sub}</p>
      </div>
      <div style={{display:"grid",gap:6,marginBottom:36}}>
        {cur.opts.map(o=><button key={o.v} className={`qopt${isSel(o.v)?" on":""}`} onClick={()=>toggle(o.v)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:isSel(o.v)?500:300}}>{o.l}</span>
            {isSel(o.v)&&<span style={{width:18,height:18,background:black,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:cream,fontSize:10,flexShrink:0}}>✓</span>}
          </div>
        </button>)}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {step>0?<button className="btn-ghost" onClick={()=>setStep(step-1)}>← Back</button>:<div/>}
        {step<steps.length-1
          ?<button className="btn btn-blk" onClick={()=>canNext&&setStep(step+1)} style={{opacity:canNext?1:.3}}>Continue →</button>
          :<button className="btn btn-blk" onClick={()=>canNext&&onComplete(ans)} style={{opacity:canNext?1:.3}}>See My Matches →</button>}
      </div>
    </div>
  </div>;
}

function Results({profile,onProductClick}){
  const [filter,setFilter]=useState("All");
  const cats=["All","Tops","Denim","Knitwear","Trousers"];
  const shown=filter==="All"?PRODUCTS:PRODUCTS.filter(p=>p.cat===filter);
  return <div style={{background:cream}}>
    {/* Profile strip */}
    <div style={{background:white,borderBottom:`1px solid ${border}`,padding:"14px 64px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:9,color:muted,letterSpacing:".1em",textTransform:"uppercase",marginRight:6}}>Your Profile:</span>
        <span className="pill">{HT[profile.height]}</span>
        {profile.bodyTypes.map(bt=><span key={bt} className="pill" style={{textTransform:"capitalize"}}>{bt}</span>)}
        <span className="pill" style={{textTransform:"capitalize"}}>{profile.fitPref} Fit</span>
      </div>
      <button className="btn-ghost" style={{fontSize:10,letterSpacing:".08em",textDecoration:"underline"}}>View / Edit</button>
    </div>

    <div style={{padding:"56px 64px"}}>
      <div style={{marginBottom:40}}>
        <span className="sec-lab">Recommended for you</span>
        <h2 className="ef" style={{fontSize:52,fontWeight:400,marginBottom:8}}>Your Matches</h2>
        <p style={{fontSize:13,color:muted,fontWeight:300}}>Ranked by fit compatibility with your profile.</p>
      </div>

      <div style={{display:"flex",gap:0,borderBottom:`1px solid ${border}`,marginBottom:40}}>
        {cats.map(c=><button key={c} className={`tab${filter===c?" on":""}`} onClick={()=>setFilter(c)}>{c}</button>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
        {shown.map(p=><div key={p.id} className="pcard" onClick={()=>onProductClick(p)}>
          <div style={{position:"relative"}}>
            <img src={p.img} style={{width:"100%",height:280,objectFit:"cover",display:"block"}} alt=""/>
            <span className="badge" style={{position:"absolute",top:12,left:12}}>{p.match}% MATCH</span>
          </div>
          <div style={{padding:"16px 18px"}}>
            <div style={{fontSize:9,color:muted,letterSpacing:".12em",textTransform:"uppercase",marginBottom:5,fontWeight:500}}>{p.brand}</div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:10}}>{p.name}</div>
            <div style={{marginBottom:10}}>
              {[["Fit",p.fit],["Quality",p.qual],["Comfort",p.comf]].map(([l,v])=><div key={l} style={{marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:9,color:muted,letterSpacing:".06em",textTransform:"uppercase"}}>{l}</span>
                  <span style={{fontSize:9,color:muted}}>{v}</span>
                </div>
                <div className="bar-t"><div className="bar-f" style={{width:`${(v/5)*100}%`}}/></div>
              </div>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:`1px solid ${border}`}}>
              <span style={{fontWeight:500,fontSize:14}}>{p.price}</span>
              <span style={{fontSize:10,color:muted}}>{p.n} reviews</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  </div>;
}

function Product({product:p,profile,onBack}){
  const [showForm,setShowForm]=useState(false);
  const [done,setDone]=useState(false);
  const [fitR,setFitR]=useState(0);
  const [qualR,setQualR]=useState(0);
  const [comfR,setComfR]=useState(0);
  const [txt,setTxt]=useState("");

  const RRow=({label,val,setVal})=><div className="rat-row">
    <span style={{fontSize:13,fontWeight:400}}>{label}</span>
    <div style={{display:"flex",gap:6}}>
      {[1,2,3,4,5].map(i=><button key={i} onClick={()=>setVal(i)} style={{width:32,height:32,borderRadius:"50%",border:val>=i?"none":`1px solid ${border}`,background:val>=i?black:white,cursor:"pointer",fontSize:10,fontWeight:500,color:val>=i?cream:muted,transition:"all .15s",fontFamily:"'Inter',sans-serif"}}>{i}</button>)}
    </div>
  </div>;

  return <div className="a0" style={{background:cream}}>
    <div style={{padding:"14px 64px",borderBottom:`1px solid ${border}`,background:white}}>
      <button className="btn-ghost" onClick={onBack}>← Back to Results</button>
    </div>

    <div style={{padding:"60px 64px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}}>
      <div style={{position:"sticky",top:80}}>
        <img src={p.img} style={{width:"100%",height:580,objectFit:"cover",display:"block"}} alt=""/>
      </div>

      <div>
        <div style={{fontSize:9,color:muted,letterSpacing:".16em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>{p.brand}</div>
        <h1 className="ef" style={{fontSize:52,fontWeight:400,marginBottom:8,lineHeight:1.05}}>{p.name}</h1>
        <div style={{fontSize:22,fontWeight:400,marginBottom:36}}>{p.price}</div>

        {/* Fit Insight panel */}
        <div style={{border:`1px solid ${black}`,padding:"24px 28px",marginBottom:32}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <span style={{fontSize:9,fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",color:muted}}>Fit Insight</span>
            <span style={{fontSize:9,color:muted,cursor:"pointer"}}>✕</span>
          </div>
          <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:12}}>
            <span className="ef" style={{fontSize:52,fontWeight:400,lineHeight:1}}>{p.match}%</span>
            <span style={{fontSize:10,color:muted,letterSpacing:".08em",textTransform:"uppercase"}}>Fit Match Score</span>
          </div>
          <div style={{fontSize:10,color:muted,marginBottom:4}}>This piece runs</div>
          <div style={{fontSize:16,fontWeight:500,marginBottom:14}}>True to Size</div>
          <p style={{fontSize:13,color:muted,lineHeight:1.8,marginBottom:14,fontWeight:300}}>{p.note}</p>
          {profile&&<div style={{background:"#F0EBE3",padding:"10px 14px",fontSize:11,color:muted,borderLeft:`2px solid ${black}`}}>
            Based on reviews from {HT[profile.height]} · {profile.bodyTypes.join(", ")}
          </div>}
        </div>

        {/* Ratings */}
        <div style={{marginBottom:32}}>
          <span className="sec-lab">Average Ratings</span>
          {[["Fit Accuracy",p.fit],["Quality",p.qual],["Comfort",p.comf]].map(([l,v])=><div key={l} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,color:muted,letterSpacing:".04em"}}>{l}</span>
              <span style={{fontSize:12,fontWeight:500}}>{v} / 5</span>
            </div>
            <div className="bar-t"><div className="bar-f" style={{width:`${(v/5)*100}%`}}/></div>
          </div>)}
          <div style={{fontSize:10,color:muted,marginTop:6}}>Based on {p.n} verified reviews</div>
        </div>

        <button className="btn btn-blk" style={{width:"100%",marginBottom:8}} onClick={()=>setShowForm(!showForm)}>
          {showForm?"Cancel":"I Own This — Write a Review"}
        </button>
        <div style={{textAlign:"center",fontSize:10,color:muted,marginTop:6}}>Earn 50 points · Reviews help others find their fit</div>
      </div>
    </div>

    {showForm&&<div className="a0" style={{background:white,borderTop:`1px solid ${border}`,padding:"52px 64px"}}>
      <h2 className="ef" style={{fontSize:40,fontWeight:400,marginBottom:8}}>Write a Review</h2>
      <p style={{fontSize:13,color:muted,marginBottom:36,fontWeight:300}}>Your profile is pre-filled. Rate your experience and help others find their fit.</p>
      <div style={{maxWidth:520}}>
        {profile&&<div style={{background:"#F5F2ED",padding:"14px 18px",marginBottom:32,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:9,color:muted,letterSpacing:".1em",textTransform:"uppercase"}}>Pre-filled from profile:</span>
          <span className="pill">{HT[profile.height]}</span>
          {profile.bodyTypes.map(bt=><span key={bt} className="pill" style={{textTransform:"capitalize"}}>{bt}</span>)}
          <span className="pill" style={{textTransform:"capitalize"}}>{profile.fitPref} fit</span>
        </div>}
        <RRow label="Fit Accuracy" val={fitR} setVal={setFitR}/>
        <RRow label="Quality" val={qualR} setVal={setQualR}/>
        <RRow label="Comfort" val={comfR} setVal={setComfR}/>
        <div style={{paddingTop:24,marginBottom:24}}>
          <div style={{fontSize:9,color:muted,letterSpacing:".12em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Written Review (optional)</div>
          <textarea value={txt} onChange={e=>setTxt(e.target.value)} className="inp" rows={4} style={{resize:"vertical"}} placeholder="What should someone with your body type know about this piece?"/>
        </div>
        <button className="btn btn-blk" style={{width:"100%"}} onClick={()=>{if(fitR&&qualR){setDone(true);setShowForm(false);}}}>
          Submit Review · Earn 50 Points
        </button>
      </div>
    </div>}

    {done&&<div className="a0" style={{background:"#F0EBE3",borderTop:`1px solid ${border}`,padding:"18px 64px",display:"flex",alignItems:"center",gap:14}}>
      <span style={{width:28,height:28,background:black,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:cream,fontSize:11,flexShrink:0}}>✓</span>
      <div>
        <span style={{fontWeight:500,fontSize:13,marginRight:12}}>Review submitted.</span>
        <span style={{fontSize:12,color:muted}}>You've earned 50 points toward Premium access.</span>
      </div>
    </div>}

    {/* Reviews */}
    <div style={{padding:"52px 64px",borderTop:`1px solid ${border}`}}>
      <span className="sec-lab">What real women are saying</span>
      <h2 className="ef" style={{fontSize:40,fontWeight:400,marginBottom:8}}>Reviews from Women Like You</h2>
      <p style={{fontSize:12,color:muted,marginBottom:36,fontWeight:300}}>Filtered to match your height and build.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {REVIEWS.map((r,i)=><div key={i} className="rcard">
          <Star n={r.fit}/>
          <p style={{fontSize:13,color:"#555",lineHeight:1.85,margin:"16px 0 20px",fontWeight:300}}>"{r.txt}"</p>
          <div style={{borderTop:`1px solid ${border}`,paddingTop:16,display:"flex",gap:6,flexWrap:"wrap"}}>
            <span className="pill">{r.ht}</span>
            <span className="pill">{r.bt}</span>
            <span className="pill">{r.fp} fit</span>
          </div>
          <div style={{marginTop:12,fontSize:11,color:"#BBB"}}>{r.h} found this helpful</div>
        </div>)}
      </div>
    </div>
  </div>;
}

export default function App(){
  const [view,setView]=useState("landing");
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [product,setProduct]=useState(null);

  return <div style={{background:cream,minHeight:"100vh"}}>
    <style>{css}</style>
    <Nav view={view} setView={setView} user={user}/>
    {view==="landing"&&<Landing onStart={()=>setView(user?"quiz":"auth")} onLogin={()=>setView("auth")}/>}
    {view==="auth"&&<Auth onAuth={u=>{setUser(u);setView("quiz");}}/>}
    {view==="quiz"&&<Quiz onComplete={a=>{setProfile(a);setView("results");}}/>}
    {view==="results"&&<Results profile={profile} onProductClick={p=>{setProduct(p);setView("product");}}/>}
    {view==="product"&&product&&<Product product={product} profile={profile} onBack={()=>setView("results")}/>}
  </div>;
}
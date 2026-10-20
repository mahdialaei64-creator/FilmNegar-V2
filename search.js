const G={28:'اکشن',12:'ماجراجویی',16:'انیمیشن',35:'کمدی',80:'جنایی',99:'مستند',18:'درام',10751:'خانوادگی',14:'فانتزی',36:'تاریخی',27:'ترسناک',10402:'موسیقی',9648:'معمایی',10749:'عاشقانه',878:'علمی‌تخیلی',53:'هیجانی',10752:'جنگی',37:'وسترن',10759:'اکشن و ماجراجویی',10762:'کودکان',10764:'واقعیت',10765:'علمی‌تخیلی و فانتزی',10768:'جنگ و سیاست'};
module.exports=async(req,res)=>{
  const key=process.env.TMDB_API_KEY, q=String(req.query.q||'').trim();
  if(!key) return res.status(500).json({error:'TMDB_API_KEY تنظیم نشده است'});
  if(q.length<2) return res.json({results:[]});
  const bearer=key.length>60;
  const url='https://api.themoviedb.org/3/search/multi?include_adult=false&language=fa-IR&query='+encodeURIComponent(q)+(bearer?'':'&api_key='+key);
  try{
    const r=await fetch(url,bearer?{headers:{Authorization:'Bearer '+key}}:{});
    if(!r.ok) return res.status(502).json({error:'خطا از TMDB',status:r.status});
    const d=await r.json();
    const results=(d.results||[]).filter(x=>x.media_type==='movie'||x.media_type==='tv').slice(0,10).map(x=>({
      id:'t'+x.media_type+x.id,
      t:x.title||x.name,
      k:x.media_type==='tv'?'series':'film',
      o:x.original_language==='fa'?'ایرانی':'خارجی',
      y:(x.release_date||x.first_air_date||'').slice(0,4),
      g:(x.genre_ids||[]).map(i=>G[i]).filter(Boolean).slice(0,2).join('، '),
      d:x.overview||'',
      img:x.poster_path?'https://image.tmdb.org/t/p/w185'+x.poster_path:''
    }));
    res.setHeader('Cache-Control','s-maxage=3600');
    res.json({results});
  }catch(e){res.status(500).json({error:'اتصال برقرار نشد'})}
};

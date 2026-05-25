export async function POST(req: Request){
 const data = await req.json();
 console.log("nuevo mensaje", data);
 return new Response(JSON.stringify({ok:true}));
}
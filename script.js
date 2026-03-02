const SUPABASE_URL = "https://hhovzpbmovzkjhngqche.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhob3Z6cGJtb3Z6a2pobmdxY2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODc5MTEsImV4cCI6MjA4NzY2MzkxMX0.Yk2AgdcQBCvLivBwz26s5favHnikTJiS6_3JTFbwLYI";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const btn = document.getElementById("btnDescobrir");
const resultado = document.getElementById("resultado");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

btn.addEventListener("click", async () => {

  if (!id) {
    resultado.innerHTML = "QR inválido.";
    return;
  }

  const { data, error } = await supabaseClient
  .from("qrcodes")
  .select("*")
  .eq("id", id)
  .single();

console.log("DATA:", data);
console.log("ERROR:", error);


  if (error || !data) {
    resultado.innerHTML = "Código não encontrado.";
    return;
  }

  // Incrementa acessos
  await supabaseClient
    .from("qrcodes")
    .update({ acessos: data.acessos + 1 })
    .eq("id", id);

  if (data.usado) {
    resultado.innerHTML = "⚠️ Este QR Code já foi utilizado.";
    btn.style.display = "none";
    return;
  }

  if (data.ganhou) {

    resultado.innerHTML = `
      <h2 style="color:green;">🎉 PARABÉNS! Você ganhou!</h2>
      <button id="confirmar">Confirmar Prêmio</button>
    `;

    btn.style.display = "none";

    document.getElementById("confirmar").addEventListener("click", async () => {

      await supabaseClient
        .from("qrcodes")
        .update({ usado: true })
        .eq("id", id);

      alert("Prêmio registrado! Retire outro dia.");
      document.getElementById("confirmar").disabled = true;

    });

  } else {

    resultado.innerHTML = `
      <h2 style="color:red;">❌ Não foi dessa vez.</h2>
    `;

    btn.style.display = "none";
  }

});



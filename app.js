// Plan B polling. Reads DATA_PATH from URL fragment once.
const DATA_PATH = new URLSearchParams(location.hash.slice(1)).get('d') || localStorage.getItem('DATA_PATH') || 'demo';
if (location.hash.includes('d=')) localStorage.setItem('DATA_PATH', DATA_PATH);

async function poll() {
  try {
    const base = `/d/${DATA_PATH}/`;
    const bust = '?t=' + Date.now();
    const state = await (await fetch(base + 'state.json' + bust)).json();
    document.getElementById('balance').textContent = '$' + state.balance.toFixed(2);
    document.getElementById('mode').textContent = state.mode;
    document.getElementById('paper').style.display = state.mode === 'PAPER' ? 'inline-block' : 'none';
    // render agent cards, activity, etc.
  } catch (e) {
    console.error(e);
  }
}
setInterval(poll, 15000);
poll();

function showTab(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(name).classList.remove('hidden');
}

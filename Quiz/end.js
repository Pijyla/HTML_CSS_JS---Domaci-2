window.addEventListener('load', () => {
    const fscore = localStorage.getItem('SCORE');
    document.getElementById('finalScore').innerText = fscore;
})

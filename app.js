(function () {
  const form = document.getElementById('bmi-form');
  const heightEl = document.getElementById('height');
  const weightEl = document.getElementById('weight');
  const bmiValueEl = document.getElementById('bmi-value');
  const bmiStatusEl = document.getElementById('bmi-status');
  const resetBtn = document.getElementById('reset-btn');

  const fmt = (n) => Number.isFinite(n) ? n.toFixed(2) : '—';

  function classify(bmi) {
    // 與你 Java 程式的區間完全一致
    if (bmi < 18.5) return '過輕';
    else if (bmi >= 18.5 && bmi < 24) return '正常';
    else if (bmi >= 24 && bmi < 27) return '過重';
    else return '肥胖';
  }

  function calcBMI(heightCm, weightKg) {
    if (heightCm <= 0 || weightKg <= 0) return NaN;
    const hMeter = heightCm / 100;
    return weightKg / (hMeter * hMeter);
  }

  function showResult(bmi) {
    bmiValueEl.textContent = fmt(bmi);
    bmiStatusEl.textContent = Number.isFinite(bmi) ? classify(bmi) : '—';
  }

  // 初始狀態
  showResult(NaN);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const h = parseFloat(heightEl.value);
    const w = parseFloat(weightEl.value);

    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
      showResult(NaN);
      alert('請輸入有效的正數身高與體重。');
      return;
    }
    const bmi = calcBMI(h, w);
    showResult(bmi);
  });

  resetBtn.addEventListener('click', () => {
    heightEl.value = '';
    weightEl.value = '';
    showResult(NaN);
    heightEl.focus();
  });

  // 允許 Enter 快速送出
  [heightEl, weightEl].forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') form.requestSubmit();
    });
  });
})();

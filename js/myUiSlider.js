  var mergingTooltipSlider = document.getElementById('merging-tooltips');
  var mergingTooltipSlider2 = document.getElementById('merging-tooltips-2');

  noUiSlider.create(mergingTooltipSlider, {
      start: [55, 155],
      connect: true,
      tooltips: [true, true],
      step: 1,
      range: {
          'min': 0,
          'max': 200
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        suffix: ''
      }),
  });

  noUiSlider.create(mergingTooltipSlider2, {
      start: [55, 155],
      connect: true,
      tooltips: [true, true],
      step: 1,
      range: {
          'min': 0,
          'max': 200
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        suffix: ''
      }),
  });
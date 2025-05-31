let timeframe = 'weekly';
let data = [];


 fetch('../data.json')
  .then(response => response.json())
  .then(json => {

    data =json;
    fillCards(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  }); 


  const cardsContainer = document.querySelector('.dasboard');

  const buttons = [
  { id: 'daily', value: 'daily' },
  { id: 'weekly', value: 'weekly' },
  { id: 'monthly', value: 'monthly' }
];



buttons.forEach(btn => {
  const button = document.getElementById(btn.id);
  button.addEventListener('click', () => {
    timeframe = btn.value;
    buttons.forEach(b => {
      document.getElementById(b.id).style.color = (b.id === btn.id) ? 'white' : 'var(--color-navy-200';
    });
    console.log(timeframe);
    fillCards(data);
  });
});


 

function fillCards(data) {
  data.forEach((item, i) => {
    const cardTitle = document.getElementById(`card-${i+1}-title`);
    const cardTime = document.getElementById(`card-${i+1}-time`);
    const cardPreviousTime = document.getElementById(`card-${i+1}-previous-time`);
    if (!cardTitle || !cardTime || !cardPreviousTime) return; 

    cardTitle.textContent = item.title;
    cardTime.textContent = `${item.timeframes[timeframe].current}hrs`;
    if (timeframe === 'daily') {
      cardPreviousTime.textContent = `Yesterday - ${item.timeframes[timeframe].previous}hrs`;
    } else if (timeframe === 'weekly') {
      cardPreviousTime.textContent = `Last Week - ${item.timeframes[timeframe].previous}hrs`;
    } else if (timeframe === 'monthly') {
      cardPreviousTime.textContent = `Last Month - ${item.timeframes[timeframe].previous}hrs`;
    }
  });
}

  
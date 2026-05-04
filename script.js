document.addEventListener('DOMContentLoaded', function() {
  checkAndUpdatePetInfoInHtml();

  document.querySelector('.button-container').addEventListener('click', function(event) {
    if (!event.target.matches('.pet-button')) {
      return;
    }

    var action = event.target.dataset.action;
    handlePetAction(action);
  });

  document.querySelectorAll('[data-demo]').forEach(function(button) {
    button.addEventListener('click', function() {
      runDevToolsDemo(button.dataset.demo);
    });
  });
});

var pet_info = {
  name: 'Froakie',
  weight: 10,
  happiness: 50
};

var petComments = {
  feed: ['Yum! That was delicious!', 'Nom nom nom!', 'Thanks for the snack!', 'I love treats!'],
  pet: ['That feels nice!', 'More pets please!', 'I love you!', 'Best day ever!'],
  play: ['Wheee! That was fun!', "Let's play again!", 'Great jump!', 'Again, again!'],
  rest: ['Zzzzz... that felt good', 'I needed that nap', 'Refreshed and ready!', 'Sweet dreams...'],
  ignore: ['Hey... pay attention to me', 'I feel a little lonely...', 'Did I do something wrong?', "I'm sad now..."]
};

function dropPetHappiness(amount) {
  pet_info.happiness -= amount;
}

function handlePetAction(action) {
  switch (action) {
    case 'feed':
      pet_info.happiness += 15;
      pet_info.weight += 5;
      break;
    case 'pet':
      pet_info.happiness += 10;
      break;
    case 'play':
      pet_info.happiness += 20;
      pet_info.weight -= 8;
      break;
    case 'rest':
      pet_info.happiness += 25;
      break;
    case 'ignore':
      dropPetHappiness(15);
      break;
    default:
      console.warn('Unknown pet action:', action);
  }

  showPetComment(action);
  checkAndUpdatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  if (pet_info.happiness > 100) {
    pet_info.happiness = 100;
  }
}

function updatePetInfoInHtml() {
  document.querySelector('.name').textContent = pet_info.name;
  document.querySelector('.weight').textContent = pet_info.weight;
  document.querySelector('.happiness').textContent = pet_info.happiness;
}

function showPetComment(action) {
  var comments = petComments[action] || ['Froakie is thinking...'];
  var randomComment = comments[Math.floor(Math.random() * comments.length)];
  var notification = document.querySelector('.pet-notification');

  notification.textContent = randomComment;
  notification.classList.add('is-visible');

  window.clearTimeout(showPetComment.hideTimer);
  showPetComment.hideTimer = window.setTimeout(function() {
    notification.classList.remove('is-visible');
  }, 1800);
}

function updatePetMood() {
  var happiness = pet_info.happiness;
  var mood;

  if (happiness >= 80) {
    mood = 'Ecstatic';
  } else if (happiness >= 60) {
    mood = 'Very Happy';
  } else if (happiness >= 40) {
    mood = 'Happy';
  } else if (happiness >= 20) {
    mood = 'Content';
  } else {
    mood = 'Sad';
  }

  document.querySelector('.mood').textContent = mood;
}

function updatePetImage() {
  var petImage = document.querySelector('.pet-image');
  var happiness = pet_info.happiness;
  var weight = pet_info.weight;
  var imageSrc = 'images/froakie-happy.webp';

  if (happiness <= 10) {
    imageSrc = 'images/froakie-sleepy.webp';
  } else if (happiness <= 20 || weight < 5) {
    imageSrc = 'images/froakie-hungry.webp';
  }

  petImage.setAttribute('src', imageSrc);
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
  updatePetMood();
  updatePetImage();
}

function runDevToolsDemo(demoName) {
  switch (demoName) {
    case 'log-info':
      console.log('Log Info: Hello, Console! Froakie is ready.');
      break;
    case 'log-warning':
      logWarning();
      break;
    case 'log-error':
      console.error("Log Error: I'm sorry, Dave. Froakie cannot do that.");
      break;
    case 'log-table':
      console.table([
        { action: 'Feed', happinessChange: 15, weightChange: 5 },
        { action: 'Play', happinessChange: 20, weightChange: -8 },
        { action: 'Rest', happinessChange: 25, weightChange: 0 }
      ]);
      break;
    case 'log-group':
      console.group('Log Group: Froakie care routine');
      console.log('Feed before long play sessions.');
      console.log('Rest when happiness drops.');
      console.log('Watch weight after repeated feeding.');
      console.groupEnd();
      break;
    case 'log-custom':
      console.log(
        '%cLog Custom: Froakie found a styled console message.',
        'background:#dff3ff;border:2px solid #a84835;color:#163c68;padding:6px 10px;font-weight:bold;'
      );
      break;
    case 'cause-404':
      fetch('assets/missing-devtools-demo.json');
      break;
    case 'cause-typeerror':
      causeTypeError();
      break;
    case 'cause-violation':
      causeViolation();
      break;
    case 'filter-seed':
      createFilterMessages();
      break;
    case 'user-message':
      console.log('User Message: Froakie message created by script.js');
      break;
    case 'buggy-add':
      updateSnackLabel(false);
      break;
    case 'apply-fix':
      updateSnackLabel(true);
      break;
    default:
      console.info('No DevTools demo matched:', demoName);
  }
}

function logWarning() {
  quoteDante();
}

function quoteDante() {
  console.warn('Log Warning: Abandon Hope All Ye Who Enter');
  console.trace('Warning stack trace for the Log Warning example');
}

function causeTypeError() {
  var missingNode = document.querySelector('.this-node-does-not-exist');
  missingNode.textContent = 'This intentionally causes a TypeError.';
}

function causeViolation() {
  var start = performance.now();

  while (performance.now() - start < 3000) {
    Math.sqrt(Math.random() * 1000);
  }

  console.log('Violation demo finished after a long click handler.');
}

function createFilterMessages() {
  console.debug('Verbose: Froakie debug detail for log-level filtering.');
  console.log('Feed filter text: Froakie gained five pounds.');
  console.info('Play filter text: Froakie spent energy.');
  console.warn('Rest filter text: Froakie needs a nap soon.');
  console.error('Care filter text: Froakie has a sample error-level message.');
}

function getTreatCount() {
  return document.querySelector('#treat-count').value;
}

function getBonusTreatCount() {
  return document.querySelector('#bonus-count').value;
}

function calculatePetSnackTotal(useFix) {
  var treats = getTreatCount();
  var bonusTreats = getBonusTreatCount();
  var sum = useFix ? Number(treats) + Number(bonusTreats) : treats + bonusTreats;

  return {
    treats: treats,
    bonusTreats: bonusTreats,
    sum: sum,
    sumType: typeof sum
  };
}

function updateSnackLabel(useFix) {
  var snackMath = calculatePetSnackTotal(useFix);
  document.querySelector('#snack-result').textContent = snackMath.treats + ' + ' + snackMath.bonusTreats + ' = ' + snackMath.sum;

  console.group(useFix ? 'Apply Fix' : 'Reproduce Bug');
  console.log('treats:', snackMath.treats, 'type:', typeof snackMath.treats);
  console.log('bonusTreats:', snackMath.bonusTreats, 'type:', typeof snackMath.bonusTreats);
  console.log('sum:', snackMath.sum, 'type:', snackMath.sumType);
  console.groupEnd();
}

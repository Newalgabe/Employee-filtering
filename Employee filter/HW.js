document.getElementById('confirmCheck').addEventListener('change', function() {
  document.getElementById('filterButton').disabled = !this.checked;
});

document.getElementById('filterButton').addEventListener('click', filterEmployees);
document.getElementById('clearButton').addEventListener('click', clearForm);
document.getElementById('showAllButton').addEventListener('click', showAllEmployees);

const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function filterEmployees() {
  const department = document.getElementById('department').value;
  const searchName = document.getElementById('searchName').value.toLowerCase();
  const position = document.getElementById('position').value.toLowerCase();
  const sortBy = document.getElementById('sortBy').value;

  const data = getData();
  let filteredData = data.filter(employee => 
    (!department || employee.department === department) &&
    (!searchName || employee.name.toLowerCase().includes(searchName)) &&
    (!position || employee.position.toLowerCase().includes(position))
  );

  if (sortBy) {
    const [key, order] = sortBy.split('-');
    filteredData.sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  displayEmployees(filteredData, resultDiv);
}

function clearForm() {
  document.getElementById('department').value = '';
  document.getElementById('searchName').value = '';
  document.getElementById('position').value = '';
  document.getElementById('sortBy').value = '';
  document.getElementById('confirmCheck').checked = false;
  document.getElementById('filterButton').disabled = true;
  document.getElementById('result').innerHTML = '';
}

function showAllEmployees() {
  const data = getData();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  displayEmployees(data, resultDiv);
}

function displayEmployees(data, resultDiv) {
  if (data.length > 0) {
    const ul = document.createElement('ul');
    data.forEach(employee => {
      const li = document.createElement('li');
      li.addEventListener('click', () => showModal(employee));

      const avatar = document.createElement('img');
      avatar.src = employee.avatar;
      avatar.alt = `${employee.name}'s Avatar`;
      avatar.classList.add('profile-pic');

      const name = document.createElement('span');
      name.textContent = employee.name;
      name.classList.add('name');

      const position = document.createElement('span');
      position.textContent = employee.position;

      li.appendChild(avatar);
      li.appendChild(name);
      li.appendChild(position);
      ul.appendChild(li);
    });
    resultDiv.appendChild(ul);
  } else {
    resultDiv.textContent = 'Нет сотрудников, соответствующих критериям.';
  }
}

function showModal(employee) {
  document.getElementById('modal-name').textContent = employee.name;
  document.getElementById('modal-department').textContent = employee.department;
  document.getElementById('modal-position').textContent = employee.position;
  document.getElementById('modal-avatar').src = employee.avatar;

  modal.style.display = "flex";
}



  function getData() {
    return [
      {
        "name": "Алексей Иванов",
        "department": "Маркетинг",
        "position": "Менеджер по маркетингу",
        "avatar": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      },
      {
        "name": "Ольга Петрова",
        "department": "Маркетинг",
        "position": "Аналитик по маркетингу",
        "avatar": "https://w7.pngwing.com/pngs/31/952/png-transparent-graphy-woman-businessperson-smiling-woman-arm-girl-business.png"
      },
      {
        "name": "Ирина Сидорова",
        "department": "Финансы",
        "position": "Финансовый аналитик",
        "avatar": "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2xhdXJhc3RlZmFubzI2Nl9waG90b19vZl9hX2NvbmZpZGVudF95b3VuZ19idXNpbmVzc3dvbWFuX3Bvc2luZ19lNTY2NDE4YS1kYjEwLTQwMGMtYmIyMi0wMDdlZGQ4ZjI5MzMucG5n.png"
      },
      {
        "name": "Максим Кузнецов",
        "department": "ИТ",
        "position": "Разработчик программного обеспечения",
        "avatar": "https://www.pngmart.com/files/23/Men-PNG-Isolated-File.png"
      },
      {
        "name": "Наталья Смирнова",
        "department": "Человеческие ресурсы",
        "position": "HR-менеджер",
        "avatar": "https://img.lovepik.com/free-png/20211109/lovepik-confident-business-women-png-image_400615903_wh1200.png"
      },
      {
        "name": "Дмитрий Васильев",
        "department": "Финансы",
        "position": "Бухгалтер",
        "avatar": "https://image.pngaaa.com/842/1097842-middle.png"
      },
      {
        "name": "Екатерина Михайлова",
        "department": "ИТ",
        "position": "Системный администратор",
        "avatar": "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlN19wb3J0cmFpdF9vZl9oYXBweV93b21hbl9zbWlsaW5nX3N0YW5kaW5nX2luX21vZF8yNDdkZmMxOS1iZDFmLTQyYWItOGEzMy03MmFhMzVjMDYyYjcucG5n.png"
      },
      {
        "name": "Андрей Попов",
        "department": "Маркетинг",
        "position": "Специалист по рекламе",
        "avatar": "https://img.freepik.com/free-photo/man-white_1368-3544.jpg"
      },
      {
        "name": "Татьяна Ковалёва",
        "department": "Финансы",
        "position": "Контролёр",
        "avatar": "https://w7.pngwing.com/pngs/56/867/png-transparent-woman-happiness-smile-black-woman-love-microphone-face.png"
      },
      {
        "name": "Сергей Новиков",
        "department": "ИТ",
        "position": "Аналитик данных",
        "avatar": "https://i.pinimg.com/originals/51/e0/d5/51e0d5aa27808ce689e3dd5a5cd7685a.png"
      },
      {
        "name": "Марина Федорова",
        "department": "Человеческие ресурсы",
        "position": "Рекрутер",
        "avatar": "https://www.pngitem.com/pimgs/m/50-503554_business-girl-png-business-woman-images-png-transparent.png"
      },
      {
        "name": "Виктор Захаров",
        "department": "Маркетинг",
        "position": "Менеджер по контенту",
        "avatar": "https://toppng.com/uploads/preview/happy-black-person-11531493747ib42obkabb.png"
      },
      {
        "name": "Анна Баранова",
        "department": "ИТ",
        "position": "Разработчик мобильных приложений",
        "avatar": "https://www.kindpng.com/picc/m/63-630792_transparent-woman-png-business-woman-beauty-png-png.png"
      },
      {
        "name": "Игорь Соловьев",
        "department": "Человеческие ресурсы",
        "position": "Специалист по обучению",
        "avatar": "https://www.pngitem.com/pimgs/m/106-1068071_black-person-png-black-man-business-png-transparent.png"
      },
      {
        "name": "Юлия Лебедева",
        "department": "Финансы",
        "position": "Финансовый консультант",
        "avatar": "https://pngimg.com/d/student_PNG182.png"
      },
      {
        "name": "Владимир Борисов",
        "department": "Маркетинг",
        "position": "PR-специалист",
        "avatar": "https://img.lovepik.com/free-png/20210918/lovepik-business-men-manipulate-pictures-with-laptop-png-image_400248627_wh1200.png"
      },
      {
        "name": "Елена Воробьёва",
        "department": "Человеческие ресурсы",
        "position": "Специалист по компенсациям и льготам",
        "avatar": "https://img.freepik.com/free-photo/vertical-image-smiling-blonde-business-woman-eyeglasses-posing-sideways-with-crossed-arms-white_171337-6314.jpg?t=st=1715972947~exp=1715976547~hmac=a794222e6cbbc7a04da2f71db174b3545b24659ee3dc2e0abd58adabf670a5b6&w=740"
      },
      {
        "name": "Александр Герасимов",
        "department": "ИТ",
        "position": "Инженер по безопасности",
        "avatar": "https://toppng.com/uploads/preview/stock-person-png-stock-photo-man-11563049686zqeb9zmqjd.png"
      },
      {
        "name": "Светлана Чернова",
        "department": "Маркетинг",
        "position": "Менеджер по продукту",
        "avatar": "https://e7.pngegg.com/pngimages/290/180/png-clipart-businessperson-corporation-chinese-organization-business-hand-people.png"
      },
      {
        "name": "Роман Григорьев",
        "department": "Финансы",
        "position": "Риск-менеджер",
        "avatar": "https://www.pngall.com/wp-content/uploads/2016/05/Man-Download-PNG.png"
      }
    ];
  }
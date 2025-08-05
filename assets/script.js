const tempTask = document.getElementById('timeTask');
const createTaskArea = document.getElementById('createTask')
const allTimes = document.querySelectorAll("[data-ref]");
const btnSave = document.getElementById('btnSave');
const taskName = document.getElementById('taskName')
const descriptionTask = document.getElementById('descriptionTask')
const taskArea = document.getElementsByClassName('tasks-area')
const searchTask = document.getElementById('searchTask')
const tasksArea = document.getElementById('tasksArea')

const states = {
    items: [],
    searchContact(name = '') {
        const filteredItems = this.items.filter(item => {
            if (name === '') return true;

            const itemMinusculo = String(item.taskName).toLowerCase()
            const nameMinusculo = String(name).toLowerCase()
            const descriptionMinusculo = String(item.description)

            if (descriptionMinusculo.includes(nameMinusculo)) return true;
            return itemMinusculo.includes(nameMinusculo)
        })
        return filteredItems
    }
}

function createContact(time, taskName, description) {
    return states.items.push({
        time: time,
        taskName: taskName,
        description: description
    })
}

function createTask(list, areaTask) {
    function generateTask(item) {
        const div = document.createElement('label')
        const task = document.createElement('div')
        const p = document.createElement('p')
        const h1 = document.createElement('h1')
        const description = document.createElement('p')
        const confirm = document.createElement('input')
        const timearea = document.createElement('div')
        const clock = document.createElement('i')

        p.innerText = item.time
        description.innerText = item.description
        h1.innerText = item.taskName
        confirm.type = "checkbox"


        description.classList.add('descripton-task')
        h1.classList.add('name-task')
        task.classList.add('information-task-area')
        div.classList.add('task-area')

        p.classList.add('time-zone')
        clock.classList.add('fa-regular')
        clock.classList.add('fa-clock')
        timearea.classList.add('timer-area')

        timearea.appendChild(clock)
        timearea.appendChild(p)
        task.appendChild(timearea)
        task.appendChild(h1)
        task.appendChild(description)
        div.appendChild(confirm)
        div.appendChild(task)

        return div
    }

    const fragment = document.createDocumentFragment()

    for (const item of list) {
        const task = generateTask(item)
        fragment.appendChild(task)

    }
    areaTask.replaceChildren()
    areaTask.append(fragment)
}

function formatTime(time) {
    if (time.value === "0") return `10min`
    if (time.value === "1") return `30min`
    if (time.value === "2") return `1h`
}

document.addEventListener('click', e => {
    if (!e.target.dataset.button) return;
    const openOrClose = e.target.dataset.button === "open" ? createTaskArea.showModal() : createTaskArea.close();
    openOrClose
})

btnSave.addEventListener('click', () => {
    if (taskName.value === '') return false;
    createContact(formatTime(tempTask), taskName.value, descriptionTask.value)
    taskName.value = ''
    descriptionTask.value = ''

    createTask(states.items, tasksArea)
})

searchTask.addEventListener('input', e => {
    createTask(states.searchContact(e.target.value), tasksArea)
})
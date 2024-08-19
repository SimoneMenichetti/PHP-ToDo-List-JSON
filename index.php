<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="./CSS/style.css"> <!--CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <!-- Aggiungi Font Awesome -->
</head>
<body>
    <div id="app">
        <div v-if="!selectedTodo">
            <h1>Todo List</h1>
            <div class="todo-container">
                <ul>
                    <li v-for="(todo, index) in todos" :key="index">
                        <span :class="{ done: todo.completed }" @click="toggleComplete(index)">{{ todo.text }}</span>
                        <button @click="deleteTodo(index)" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button @click="viewDetail(todo)" class="view-btn">
                            VEDI
                        </button>
                    </li>
                </ul>
                <div class="input-container">
                    <input 
                        type="text" 
                        v-model="newTodo.text" 
                        placeholder="Inserisci elemento..." 
                        @keyup.enter="addTodo"
                    >
                    <input 
                        type="text" 
                        v-model="newTodo.description" 
                        placeholder="Inserisci descrizione..."
                    >
                    <button  @click="addTodo" class="btn insert">Inserisci</button>
                </div>
            </div>
        </div>
        <div v-if="selectedTodo" class="todo-detail">
            <h1>Dettaglio del Task</h1>
            <p><strong>Task:</strong> {{ selectedTodo.text }}</p>
            <p><strong>Descrizione:</strong> {{ selectedTodo.description }}</p>
            <button @click="selectedTodo = null">Torna alla Lista</button>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./JS/todolist.js"></script> <!-- Percorso corretto per il JavaScript -->
</body>
</html>
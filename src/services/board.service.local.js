import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { SOCKET_EVENT_UPDATE_BOARD, socketService } from './socket.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'
const BASE_URL = 'board'

export const boardService = {
    query,
    getBoardById,
    update,
    save,
    remove,
    
}

// General Update function
async function update(type, boardId, groupId = null, taskId = null, { key, value }) {
    try {
        const board = await getBoardById(boardId)
        const activityType = getActivityType(key)
        let groupIdx, taskIdx, activity

        switch (type) {
            case 'board':
                if (!boardId) throw new Error('Error updating')
                const oldBoard = board[key]
                board[key] = value

                if (key === 'groups' || key === 'kanbanCmpsOrder' || key === 'cmpsOrder') break
                activity = await createActivity({ type: activityType, from: oldBoard, to: value }, board._id)
                board.activities.unshift(activity)
                break

            case 'group':
                if (!groupId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                const oldGroup = board.groups[groupIdx][key]
                board.groups[groupIdx][key] = value

                activity = await createActivity({ type: activityType, from: oldGroup[key], to: value }, board._id, groupId)
                board.activities.unshift(activity)
                break

            case 'task':
                if (!taskId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
                const oldTask = board.groups[groupIdx].tasks[taskIdx][key]
                board.groups[groupIdx].tasks[taskIdx][key] = value

                activity = await createActivity({ type: activityType, from: oldTask, to: value }, boardId, groupId, taskId)
                board.activities.unshift(activity)
                break

            default:
                break
        }

        let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
        // return await storageService.put(STORAGE_KEY, board)
        socketService.emit(SOCKET_EVENT_UPDATE_BOARD, boardId)
        return updatedBoard
    }
    catch (err) {
        console.log(err)
        throw err
    }

}
// Board functions
async function query() {
    return httpService.get(BASE_URL, null)
    // return await storageService.query(STORAGE_KEY)
}

async function getBoardById(boardId, filterBy = { txt: '', person: null }, sortBy) {
    let boards = await query()
    let board = boards.find(board => board._id === boardId)
    // let board = await storageService.get(STORAGE_KEY, boardId)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        board.groups = board.groups.map((group) => {
            const filteredTasks = group.tasks.filter((task) => regex.test(task.title))

            // If there are matching tasks or the group title matches, include the group
            if (filteredTasks.length > 0 || regex.test(group.title)) {
                if (filteredTasks.length > 0) {
                    group.tasks = filteredTasks
                }
                return group;
            }
            // If no matching tasks and group title doesn't match, exclude the group
            return null
        }).filter((group) => group !== null) // Remove groups without matching tasks or title
    }

    if (filterBy.person) {
        board.groups = board.groups.map((group) => {
            const filteredTasks = group.tasks.filter((task) => task.memberIds.includes(filterBy.person._id))

            if (filteredTasks.length > 0) {
                group.tasks = filteredTasks
                return group;
            }

            return null;
        }).filter((group) => group !== null)
    }

    if (sortBy) {
        board.groups = board.groups.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA < titleB) {
                return -1
            } else if (titleA > titleB) {
                return 1
            } else {
                return 0
            }
        })

    }

    return board
}

async function save(board) {
    return await httpService.post(BASE_URL, board)
    // return await storageService.post(STORAGE_KEY, board)
}

async function remove(boardId) {
    return httpService.delete(`${BASE_URL}/${boardId}`, boardId)
    // return await storageService.remove(STORAGE_KEY, boardId)
}


// function _createBoards() {
//     // let boards = utilService.loadFromStorage(STORAGE_KEY)
//     let boards = httpService.get(BASE_URL, null)
//     if (!boards || !boards.length) {
//         // utilService.saveToStorage(STORAGE_KEY, boards)
//     }
// }
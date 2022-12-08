const input = await Deno.readTextFile('./input.txt')

const commands = input.split('\r\n').map((inp) => inp.split(' '))

type DirectoryFile = {
  type: 'file'
  name: string
  size: number
}

type DirectoryMap = Map<string, Directory | DirectoryFile>
type Directory = {
  type: 'dir'
  name: string
  childern: DirectoryMap
  size: number
}

const fileStrcutureMap = {
  name: 'root',
  type: 'dir',
  childern: new Map() as DirectoryMap,
  size: 0,
} as Directory

const historyMap: string[] = []
let currentDir: null | Directory = null
let total = 0

for (const command of commands) {
  if (command[0] === '$' && command[1] === 'cd') {
    if (command[2] === '/') {
      currentDir = fileStrcutureMap
    }

    if (command[2] === '..') {
      historyMap.pop() // pop out last item

      const size = currentDir?.size
      if (size && size < 100000) {
        total += size // check size
      }

      if (historyMap.length <= 0) {
        // if length id zero then assign filestrcture to map and update size
        currentDir = fileStrcutureMap

        if (currentDir && size) {
          currentDir.size += size
        }
      }

      if (historyMap.length > 0) {
        const temp = fileStrcutureMap.childern?.get(historyMap[0])
        if (temp && temp?.type === 'dir') {
          currentDir = temp

          if (historyMap.length === 1) {
            if (currentDir && size) {
              currentDir.size += size
            }
          }
        }

        // only when length is higher then 2
        for (let i = 1; i < historyMap.length; i++) {
          const temp = currentDir?.childern?.get(historyMap[i])
          // console.log(temp)
          const isDir = temp && temp?.type === 'dir'
          // console.log(temp)
          if (i === historyMap.length - 1) {
            if (isDir && size) {
              temp.size += size
            }
          }
          if (isDir) {
            currentDir = temp
          }
        }
      }
    }

    if (command[2] !== '/' && command[2] !== '..') {
      historyMap.push(command[2])
      // @ts-ignore
      const temp = currentDir.childern?.get(command[2])
      if (temp && temp?.type === 'dir') {
        currentDir = temp
      }
    }
  }

  if (command[0] !== '$') {
    if (command[0] === 'dir') {
      // is directory
      currentDir?.childern?.set(command[1], {
        type: 'dir',
        name: command[1],
        childern: new Map(),
        size: 0,
      })
    } else {
      // is file
      if (currentDir) {
        currentDir.size += parseInt(command[0], 10)
      }
      currentDir?.childern?.set(command[1], {
        type: 'file',
        name: command[1],
        size: parseInt(command[0], 10),
      })
    }
  }
}

if (currentDir?.size) {
  fileStrcutureMap.size += currentDir.size
}

console.dir(total) // 1444896

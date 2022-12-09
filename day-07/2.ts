const input = await Deno.readTextFile('./input.txt')

const commands = input.split('\r\n').map((inp) => inp.split(' '))

type DirectoryFile = {
  type: 'file'
  name: string
  size: number
  parent: null | Directory
}

type DirectoryMap = Map<string, Directory | DirectoryFile>
type Directory = {
  type: 'dir'
  name: string
  childern: DirectoryMap
  size: number
  parent: null | Directory
}

const fileStrcutureMap = {
  name: 'root',
  type: 'dir',
  childern: new Map() as DirectoryMap,
  size: 0,
  parent: null,
} as Directory

let currentDir: null | Directory = null

function createFileTree(commands: string[][]) {
  for (const command of commands) {
    if (command[0] === '$' && command[1] === 'cd') {
      if (command[2] === '/') {
        currentDir = fileStrcutureMap
      }

      if (command[2] === '..') {
        if (currentDir?.parent) {
          currentDir = currentDir.parent
        }
      }

      if (command[2] !== '/' && command[2] !== '..') {
        const temp = currentDir?.childern?.get(command[2]) as Directory
        if (temp && temp?.type === 'dir') {
          temp.parent = currentDir // assign parent
          currentDir = temp // assign to current dir
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
          parent: currentDir,
        })
      } else {
        // is file

        currentDir?.childern?.set(command[1], {
          type: 'file',
          name: command[1],
          size: parseInt(command[0], 10),
          parent: currentDir,
        })
      }
    }
  }
}

function getSizes(
  directoriesAndFiles: Directory | DirectoryFile,
  callback?: (name: string, size: number) => void
) {
  if (directoriesAndFiles.type === 'dir') {
    directoriesAndFiles.childern.forEach((dir) => {
      if (dir.parent) {
        const size = getSizes(dir, callback)

        if (callback) {
          callback(dir.name, dir.size)
        }
        dir.parent.size += size
      }
    })
  }

  return directoriesAndFiles.size
}

function main() {
  createFileTree(commands)
  const usedSpace = getSizes(fileStrcutureMap)
  const totalSpace = 70000000
  const updateSizeSpace = 30000000
  const unusedSpace = totalSpace - usedSpace
  const requiredSpaceForUpdate = updateSizeSpace - unusedSpace
  const smallestDirSize: number[] = []

  getSizes(fileStrcutureMap, (_, size) => {
    if (size > requiredSpaceForUpdate) {
      smallestDirSize.push(size)
    }
  })

  console.log(smallestDirSize.sort((a, b) => a - b)[0])
}

main()

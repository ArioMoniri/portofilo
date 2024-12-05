'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const pcParts = [
  { name: 'CPU', icon: '🧠' },
  { name: 'GPU', icon: '🖼️' },
  { name: 'RAM', icon: '🧠' },
  { name: 'SSD', icon: '💾' },
  { name: 'Motherboard', icon: '🔌' },
  { name: 'Power Supply', icon: '🔋' },
]

export default function PCEngineering() {
  const [assembledParts, setAssembledParts] = useState([])

  const handleDragStart = (e, part) => {
    e.dataTransfer.setData('text/plain', part.name)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const partName = e.dataTransfer.getData('text')
    const part = pcParts.find(p => p.name === partName)
    if (part && !assembledParts.includes(part)) {
      setAssembledParts([...assembledParts, part])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="bg-white bg-opacity-75 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">PC Engineering</h2>
      <div className="flex justify-between">
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-2">Available Parts</h3>
          <div className="grid grid-cols-2 gap-2">
            {pcParts.map((part) => (
              <motion.div
                key={part.name}
                draggable
                onDragStart={(e) => handleDragStart(e, part)}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-200 p-2 rounded text-center cursor-move"
              >
                <span className="text-2xl mr-2">{part.icon}</span>
                {part.name}
              </motion.div>
            ))}
          </div>
        </div>
        <div
          className="w-1/2 bg-gray-200 p-4 rounded"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h3 className="text-xl font-semibold mb-2">Assembled PC</h3>
          {assembledParts.length === 0 ? (
            <p>Drag and drop parts here to assemble your PC</p>
          ) : (
            <ul>
              {assembledParts.map((part) => (
                <li key={part.name} className="mb-2">
                  <span className="text-2xl mr-2">{part.icon}</span>
                  {part.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}


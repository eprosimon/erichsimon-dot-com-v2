"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function TaskListItem({
  children,
  isChecked: initialIsChecked = false,
}: {
  children: React.ReactNode
  isChecked?: boolean
}) {
  const [isChecked, setIsChecked] = useState(initialIsChecked)
  const taskKey = `task-${typeof children === "string" ? btoa(children) : Math.random().toString(36).substring(7)}`

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(taskKey)
      if (savedState !== null) {
        setIsChecked(JSON.parse(savedState))
      } else {
        setIsChecked(initialIsChecked)
      }
    } catch (error) {
      console.error("Error loading task state:", error)
      setIsChecked(initialIsChecked)
    }
  }, [taskKey, initialIsChecked])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newState = event.target.checked
      setIsChecked(newState)
      localStorage.setItem(taskKey, JSON.stringify(newState))
    } catch (error) {
      console.error("Error saving task state:", error)
    }
  }

  return (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className={isChecked ? "line-through text-gray-500" : ""}>{children}</span>
    </li>
  )
}


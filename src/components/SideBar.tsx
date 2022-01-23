import { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { api } from '../services/api'

import { Button } from './Button'

interface SideBarProps {
  selectedGenreId: number
  setSelectedGenreId: Dispatch<SetStateAction<number>>
}
interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}
 
export function SideBar({ selectedGenreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  return (
    <nav className='sidebar'>
      <span>Watch<p>Me</p></span>
      
      <div className='buttons-container'>
        {genres.map((genre) => (
          <Button 
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}

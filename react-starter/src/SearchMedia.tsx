import type {
    MediaType,
    SearchParams,
    SearchItem,
    FullItem,
} from '@/lib/omdb'
import React, { useState, type FormEvent } from 'react';
import { Label } from './components/ui/label';
import { useNavigate } from 'react-router';

export default function SearchMedia() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [imdbId, setImdbId] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState<MediaType | undefined>();
    //const [loading, setLoading] = useState(false);
    //const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const params = new URLSearchParams();
        if (title.trim()) params.set("query", title.trim());
        if (year.trim()) params.set("year", year.trim());
        if (imdbId.trim()) params.set("imdbId", imdbId.trim());
        if (type) params.set("type", type);
        params.set("page", String(page || 1));

        navigate(`/search?${params.toString()}`);        

       /* setPage(1);
        setTitle('');
        setYear('');
        setImdbId('');
        setType(undefined); */
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                <SelectParamType
                    label='title'
                    value={title}
                    onChange={setTitle}
                />
                <SelectParamType
                    label='year'
                    value={year}
                    onChange={setYear}
                />
                <SelectParamType
                    label='imdbId'
                    value={imdbId} 
                    onChange={setImdbId}
                />
                <SelectParamType<number>
                    label='page number'
                    value={page}
                    onChange={setPage}
                    type='number'
                />
                <div>
                    <Label htmlFor='type' className='text-sm font-medium text-gray-700'>
                        Type
                    </Label>
                    <select
                        id='type'
                        value={type}
                        onChange={(e) => setType(e.target.value as MediaType | undefined)}
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="">Any</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                </div>
            </div>
            <button
                type='submit'
                className='px-4 py-2 rounded-md bg-black text-white hover:opacity-80'
            >
                Search
            </button>
        </form>
    );
}

type InputKind = 'text' | 'number';

type SelectParamType<T extends string | number> = {
    label: string;
    value: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    placeHolder?: string;
    type?: InputKind;
}
function SelectParamType<T extends string | number>({
    label,
    value,
    onChange,
    placeHolder,
    type = "text",
}: SelectParamType<T>) {
    return (
        <div>    
            <Label htmlFor={label} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <input 
                id={label}
                name={label}
                value={value as any}
                onChange={(e) => {
                    const raw = e.target.value;
                    const next = (type === 'number' ? Number(raw) : raw) as T;
                    onChange(next);
                    }
                }
                placeholder={placeHolder ?? `Input: ${label}`}
                type={type}
                inputMode={type === 'number' ? 'numeric' : undefined}
                className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
    );
}
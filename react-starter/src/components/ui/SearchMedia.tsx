import {
    searchMedia,
} from '@/lib/omdb'

import type {
    MediaType,
    SearchParams,
    SearchResponse,
} from '@/lib/omdb'
import { useState, type FormEvent } from 'react';
import { label } from 'label'
import { Label } from './label';

function SearchMedia(searchParams: SearchParams): SearchResponse {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [imdbId, setImdbId] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState<MediaType | undefined>();

    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        
        setPage(1);
        setTitle('');
        setYear('');
        setImdbId('');
        setType(undefined);
    }

    return ;
}

type SelectParamType = {
    label: string;
    value: string;
}
function SelectParamType({
    label,
    value,
}: SelectParamType) {
    return (
        <Label className="grid grid-cols-1 gap-2 mb-4">
            
        </Label>
    )
}
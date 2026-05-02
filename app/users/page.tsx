'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUsers, getPosts, getTodos } from '@/lib/api';

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'name');
  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const {
    data: todos,
    isLoading: loadingTodos,
    isError: errorTodos,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const isLoading = loadingUsers || loadingPosts || loadingTodos;
  const isError = errorUsers || errorPosts || errorTodos;

  const enriched = useMemo(() => {
    if (!users || !posts || !todos) return [];

    return users.map((user) => {
      const userPosts = posts.filter((p: { userId: number; }) => p.userId === user.id);
      const userTodos = todos.filter((t: { userId: number; }) => t.userId === user.id);

      const completed = userTodos.filter((t: { completed: any; }) => t.completed).length;
      const pending = userTodos.length - completed;

      return {
        ...user,
        postCount: userPosts.length,
        completedTodos: completed,
        pendingTodos: pending,
      };
    });
  }, [users, posts, todos]);

  const filtered = useMemo(() => {
    let data = enriched;

    if (search) {
      data = data.filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'pending') {
      data = [...data].sort((a, b) => b.pendingTodos - a.pendingTodos);
    }

    if (sort === 'posts') {
      data = [...data].sort((a, b) => b.postCount - a.postCount);
    }

    return data;
  }, [enriched, search, sort]);

  function updateQuery(q: string, s: string) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (s) params.set('sort', s);
    router.push(`/users?${params.toString()}`);
  }
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">Failed to load users</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between bg-primary/10 rounded-2xl border border-primary/20 px-6 py-4">
          <h1 className="text-2xl text-[#2563eb] font-bold">User List</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateQuery(e.target.value, sort);
              }}
              className="border border-border px-3 py-2 rounded-lg w-full bg-background"
              placeholder="Search..."
            />

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                updateQuery(search, e.target.value);
              }}
              className="border border-border px-3 py-2 rounded-lg bg-background"
            >
              <option value="name">Sort by Name</option>
              <option value="pending">Most Pending Todos</option>
              <option value="posts">Most Posts</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border border-border rounded-xl p-4 space-y-3 animate-pulse"
              >
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-3 w-52 bg-muted rounded" />

                <div className="space-y-2 pt-2">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-3 w-28 bg-muted rounded" />
                  <div className="h-3 w-20 bg-muted rounded" />
                </div>
              </div>
            ))}

          {!isLoading &&
            filtered.map((user) => (
              <div
                key={user.id}
                onClick={() => router.push(`/users/${user.id}`)}
                className="border border-border rounded-xl cursor-pointer hover:shadow-sm transition bg-white"
              >
                <div className="bg-primary/10 px-4 py-3">
                  <h2 className="font-semibold text-primary">{user.name}</h2>
                  <p className="text-sm text-muted-foreground break-all">
                    {user.email}
                  </p>

                </div>

                <div className="mt-3 text-sm space-y-1 px-4 pb-4">
                  <p>Posts: {user.postCount}</p>
                  <p>Completed: {user.completedTodos}</p>
                  <p>Pending: {user.pendingTodos}</p>
                </div>
              </div>
            ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}
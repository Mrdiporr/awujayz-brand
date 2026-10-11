import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Eye, Trash2, Loader2, ChevronLeft, ChevronRight, Radio } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Inquiry = Tables<'inquiries'>;

const AdminInquiries = () => {
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiryResult, isLoading } = useQuery({
    queryKey: ['inquiries', brandFilter, statusFilter, search, page],
    queryFn: async () => {
      let query = supabase.from('inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false });
      
      if (brandFilter !== 'all') {
        query = query.eq('brand', brandFilter);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      const term = search.trim().replace(/[%(),]/g, '');
      if (term) query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%`);
      
      const { data, count, error } = await query.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
      if (error) throw error;
      return { rows: data, count: count ?? 0 };
    },
  });

  useEffect(() => {
    const channel = supabase.channel('admin-inquiries-live').on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['new-inquiries-count'] });
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  useEffect(() => { setPage(0); }, [brandFilter, statusFilter, search]);

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      const { error } = await supabase
        .from('inquiries')
        .update({ status, notes, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['new-inquiries-count'] });
      toast({ title: 'Inquiry updated successfully' });
      setSelectedInquiry(null);
    },
    onError: (error) => {
      toast({ title: 'Error updating inquiry', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries-count'] });
      queryClient.invalidateQueries({ queryKey: ['new-inquiries-count'] });
      toast({ title: 'Inquiry deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting inquiry', description: error.message, variant: 'destructive' });
    },
  });

  const filteredInquiries = inquiryResult?.rows;
  const pageCount = Math.max(1, Math.ceil((inquiryResult?.count ?? 0) / PAGE_SIZE));

  const handleView = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.notes || '');
    setNewStatus(inquiry.status || 'new');
  };

  const handleUpdate = () => {
    if (selectedInquiry) {
      updateMutation.mutate({
        id: selectedInquiry.id,
        status: newStatus,
        notes,
      });
    }
  };

  const brandColors: Record<string, string> = {
    'magic-potion': 'border-primary/30 text-primary',
    'easily-movers': 'border-accent text-foreground',
    cravins: 'border-destructive/30 text-destructive',
  };

  const statusColors: Record<string, string> = {
    new: 'border-primary/30 text-primary',
    contacted: 'border-muted-foreground/30 text-muted-foreground',
    completed: 'border-success/30 text-success',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">Inquiries</h2>
        <p className="text-muted-foreground">Manage customer inquiries across all brands</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-success"><Radio className="h-3 w-3" /> Live updates active</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="magic-potion">Magic Potion</SelectItem>
            <SelectItem value="easily-movers">Easily Movers</SelectItem>
            <SelectItem value="cravins">Cravins TX</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{inquiryResult?.count ?? 0} inquiries</span>
        <div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-4 w-4" /></Button><span>Page {page + 1} of {pageCount}</span><Button variant="outline" size="icon" aria-label="Next page" disabled={page + 1 >= pageCount} onClick={() => setPage((value) => value + 1)}><ChevronRight className="h-4 w-4" /></Button></div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredInquiries?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No inquiries found
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries?.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={brandColors[inquiry.brand] || ''}>
                      {inquiry.brand}
                    </Badge>
                  </TableCell>
                  <TableCell>{inquiry.inquiry_type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[inquiry.status || 'new']}>
                      {inquiry.status || 'new'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(inquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(inquiry.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View/Edit Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              View and manage this inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Brand</Label>
                  <p className="font-medium">{selectedInquiry.brand}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium">{selectedInquiry.inquiry_type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>
                {selectedInquiry.event_date && (
                  <div>
                    <Label className="text-muted-foreground">Event Date</Label>
                    <p className="font-medium">{selectedInquiry.event_date}</p>
                  </div>
                )}
                {selectedInquiry.guest_count && (
                  <div>
                    <Label className="text-muted-foreground">Guest Count</Label>
                    <p className="font-medium">{selectedInquiry.guest_count}</p>
                  </div>
                )}
              </div>
              
              {selectedInquiry.message && (
                <div>
                  <Label className="text-muted-foreground">Message</Label>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedInquiry.message}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;

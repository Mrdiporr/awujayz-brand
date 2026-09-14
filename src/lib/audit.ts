import { supabase } from '@/integrations/supabase/client';

export const writeAuditLog = async (input: {
  action: string;
  entityType: string;
  entityId?: string;
  brand?: string;
  beforeData?: unknown;
  afterData?: unknown;
  metadata?: Record<string, unknown>;
}) => {
  const { error } = await supabase.from('audit_logs').insert({
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    brand: input.brand ?? null,
    before_data: (input.beforeData ?? null) as never,
    after_data: (input.afterData ?? null) as never,
    metadata: input.metadata ?? {},
  });

  if (error) {
    console.error('Unable to write audit log:', error);
  }
};
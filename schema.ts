/* eslint no-unused-vars: 0 */
import type { FromSchema } from 'json-schema-to-ts';

export const RESOURCE = 'practitioner';
export const RESOURCE_TELECOM = 'telecom';
export const RESOURCE_META = `${RESOURCE}_metadata`;

export const SERVICE_UPGRADED = `${RESOURCE}ServiceUpgraded`;
export const SERVICE_DOWNGRADED = `${RESOURCE}ServiceDowngraded`;

export const RESOURCE_CREATED = `${RESOURCE}Created`;
export const RESOURCE_UPDATED = `${RESOURCE}Updated`;
export const RESOURCE_PATCHED = `${RESOURCE}Patched`;
export const RESOURCE_DELETED = `${RESOURCE}Deleted`;
export const RESOURCE_CHANGED = `${RESOURCE}Changed`;

export enum SortingFields {
  created = 'created_at',
  updated = 'updated_at',
}

export enum SortingOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export const resourceSchema = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  $id: 'https://github.com/alphanodus/gravity3/tree/master/src/practitioner/practitioner.json',
  type: 'object',
  title: 'practitioner',
  required: ['firstName', 'lastName', 'id'],
  properties: {
    firstName: {
      type: 'string',
      maxLength: 255,
    },
    lastName: {
      type: 'string',
      maxLength: 255,
    },
    id: {
      type: 'string',
      minLength: 1,
      pattern: '^(practitioner/)?[A-Za-z0-9-.]{1,36}$',
    },

    npi: {
      type: ['string', 'null'],
      maxLength: 255,
    },
    doNotContact: {
      type: ['boolean', 'null'],
    },
    address: {
      type: ['string', 'null'],
      maxLength: 255,
    },
    speciality: {
      type: ['string', 'null'],
      maxLength: 255,
    },
    isPriorAuthSubmissionEnabled: {
      type: ['boolean', 'null'],
      default: true,
    },
    tag: {
      type: ['string', 'null'],
      maxLength: 255,
    },
    updatedAt: {
      type: ['number', 'null'],
    },
    telecom: {
      type: 'array',
      items: {
        type: 'object',
        title: `${RESOURCE}_telecom`,
        properties: {
          system: {
            type: 'string',
            maxLength: 255,
          },
          value: {
            type: 'string',
            maxLength: 255,
          },
          use: {
            type: ['string', 'null'],
            maxLength: 255,
          },
          rank: {
            type: 'number',
          },
        },
      },
    },
    metadata: {
      type: 'object',
      title: RESOURCE_META,
      properties: {
        id: {
          type: 'string',
        },
        nudgeable: {
          type: 'boolean',
        },
      },
    },
  },
} as const;

export type Resource = FromSchema<typeof resourceSchema>;
export const resourceWriteSchema = {
  ...resourceSchema,
  title: `${RESOURCE}Write`,
  required: ['firstName', 'lastName'],
} as const;
export const resourcePatchSchema = {
  ...resourceSchema,
  title: `${RESOURCE}Patch`,
  required: [],
} as const;

export type ResourcePatch = FromSchema<typeof resourcePatchSchema>;

export type ResourceRow = {
  id: string;
  tenant?: string;
  first_name?: string;
  last_name?: string;
  npi?: string;
  do_not_contact?: boolean;
  is_prior_auth_submission_enabled?: boolean;
  deleted?: boolean;
  created_at?: number;
  updated_at?: number;
  tag?: string;
  address?: string;
  speciality?: string;
};

export type ResourceMetaRow = {
  id: string;
  nudgeable?: boolean;
};

export type ResourceTelecomRow = {
  id: string;
  practitioner_id: string;
  system: string;
  value: string;
  use: string;
  rank: number;
  created_at?: number;
  updated_at?: number;
};

export const commandResponseSchema = {
  type: 'object',
  title: `${RESOURCE}_command_response`,
  required: ['resourceID'],
  properties: {
    resourceID: {
      type: 'string',
    },
  },
} as const;

export type ResourceCommandResponse = FromSchema<typeof commandResponseSchema>;

export const queryReadResponseSchema = {
  type: 'object',
  title: `${RESOURCE}_query_read_response`,
  required: ['id', 'resource'],
  properties: {
    id: { type: 'string' },
    resource: resourceSchema,
  },
} as const;

export type ResourceQueryReadResponse = FromSchema<typeof queryReadResponseSchema>;

export const queryListResponseSchema = {
  type: 'object',
  title: `${RESOURCE}_query_list_response`,
  required: ['resource', 'pages'],
  properties: {
    resources: {
      type: 'array',
      items: resourceSchema,
    },
    pages: {
      type: 'number',
    },
  },
} as const;

export type ResourceQueryListResponse = {
  resources: Resource[];
  pages: number;
};

export const querySchema = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  $id: 'https://github.com/alphanodus/gravity3/tree/master/src/practitioner/practitioner.json',
  type: 'object',
  title: 'practitioner_query',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    npi: {
      type: 'string',
    },
    doNotContact: {
      type: 'boolean',
    },
    isPriorAuthSubmissionEnabled: {
      type: 'string',
    },
    page: {
      type: 'integer',
      minimum: 0,
    },
    limit: {
      type: 'integer',
      minimum: 1,
      maximum: 1000,
    },
    tag: {
      type: 'string',
    },
    id: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    search: {
      type: 'string',
    },
    nudgeable: {
      type: 'boolean',
    },
    order: {
      title: `${RESOURCE}_query_order`,
      type: 'string',
      enum: [...Object.values(SortingOrder)],
    },
    orderBy: {
      title: `${RESOURCE}_query_orderby`,
      type: 'string',
      enum: [...Object.keys(SortingFields)],
    },
  },
} as const;

export type ResourceQuery = FromSchema<typeof querySchema>;

function getDifference(array1, array2) {
  if ((!array1 || array1.length === 0) && (!array2 || array2.length === 0)) {
    return true;
  }
  const array1LeftOvers = array1.filter((object1) => {
    return !array2.some((object2) => {
      return Object.keys(object1).every((key) => {
        return (
          object1[key] === object2[key] ||
          ((typeof object1[key] == 'undefined' || object1[key] == null || object1[key] == '') &&
            (typeof object2[key] == 'undefined' || object2[key] == null || object2[key] == ''))
        );
      });
    });
  });

  const array2LeftOvers = array2.filter((object1) => {
    return !array1.some((object2) => {
      return Object.keys(object1).every((key) => {
        return (
          object1[key] === object2[key] ||
          ((typeof object1[key] == 'undefined' || object1[key] == null || object1[key] == '') &&
            (typeof object2[key] == 'undefined' || object2[key] == null || object2[key] == ''))
        );
      });
    });
  });

  if (array1LeftOvers.length == 0 && array2LeftOvers.length == 0) {
    return true;
  } else {
    return false;
  }
}

export function compareResources(a: Resource, b: Resource): boolean {
  return (
    a.id === b.id &&
    a.doNotContact == b.doNotContact &&
    a.firstName == b.firstName &&
    a.isPriorAuthSubmissionEnabled == b.isPriorAuthSubmissionEnabled &&
    a.lastName == b.lastName &&
    a.npi == b.npi &&
    a.tag == b.tag &&
    a.address == b.address &&
    a.speciality == b.speciality &&
    getDifference(a.telecom, b.telecom) &&
    a.metadata?.nudgeable == b.metadata?.nudgeable
  );
}

export function mapToRow(resource: Resource): ResourceRow {
  return {
    id: resource.id,
    first_name: resource.firstName,
    last_name: resource.lastName,
    npi: resource.npi,
    do_not_contact: resource.doNotContact,
    is_prior_auth_submission_enabled: resource.isPriorAuthSubmissionEnabled,
    tag: resource.tag,
    updated_at: resource.updatedAt,
    speciality: resource.speciality,
    address: resource.address,
  };
}

export function mapToRowPatch(resource: Resource): Partial<ResourceRow> {
  const result: Partial<ResourceRow> = {
    id: resource.id,
    first_name: resource.firstName,
    last_name: resource.lastName,
    npi: resource.npi,
    do_not_contact: resource.doNotContact,
    is_prior_auth_submission_enabled: resource.isPriorAuthSubmissionEnabled,
    tag: resource.tag,
    speciality: resource.speciality,
    address: resource.address,
  };

  Object.keys(result).forEach((x) => {
    if (result[x] === undefined) {
      delete result[x];
    }
  });

  return result;
}

export function mapFromRow(row: ResourceRow): Resource {
  return {
    id: row.id,
    tenant: row.tenant,
    firstName: row.first_name,
    lastName: row.last_name,
    npi: row.npi,
    doNotContact: row.do_not_contact,
    isPriorAuthSubmissionEnabled: row.is_prior_auth_submission_enabled,
    tag: row.tag,
    updatedAt: row.updated_at ? Number(row.updated_at) : null,
    speciality: row.speciality,
    address: row.address,
  };
}

export function mapFromTelecomRow(row: ResourceTelecomRow): Resource['telecom'][0] {
  return {
    system: row.system,
    value: row.value,
    use: row.use,
    rank: row.rank,
  } as Resource['telecom'][0];
}

export function mapToRowTelecoms(resource: Resource): ResourceTelecomRow[] {
  return (resource.telecom || []).map(
    (telecom) =>
      ({
        practitioner_id: resource.id,
        system: telecom.system,
        value: telecom.value,
        use: telecom.use,
        rank: telecom.rank,
      } as ResourceTelecomRow),
  );
}

export function mapToRowMetadata(parent: Resource): ResourceMetaRow {
  return {
    id: parent.id,
    nudgeable: parent.metadata?.nudgeable,
  };
}

export function mapFromRowMetaData(row: ResourceMetaRow): Resource['metadata'] {
  return {
    id: row?.id,
    nudgeable: Boolean(row?.nudgeable),
  };
}

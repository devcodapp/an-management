import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/company-repository';
import { CompanyNotFound } from './errors/company-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Address } from '../entities/address';

interface SaveCompanyRequest {
  companyId: string;
  name?: string;
  description?: string;
  tags?: string[];
  type?: string;
  image?: Express.Multer.File;
  address?: Address;
  openAt: string;
  closeAt: string;
}

interface SaveCompanyResponse {
  company: Company;
}

@Injectable()
export class SaveCompany {
  constructor(
    private companiesRepository: CompaniesRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveCompanyRequest): Promise<SaveCompanyResponse> {
    const {
      companyId,
      image,
      description,
      name,
      tags,
      type,
      closeAt,
      openAt,
      address,
    } = request;

    const company = await this.companiesRepository.company(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    if (image) {
      if (company.imageId) await this.cloudinary.deleteImage(company.imageId);

      const { public_id, url } = await this.cloudinary.uploadImage(image);
      company.imageId = public_id;
      company.imageUrl = url;
    }

    name ? (company.name = name) : null;
    description ? (company.description = description) : null;
    tags ? (company.tags = tags) : null;
    type ? (company.type = type) : null;
    openAt ? (company.openAt = openAt) : null;
    closeAt ? (company.closeAt = closeAt) : null;
    address ? (company.address = new Address(address)) : null;

    await this.companiesRepository.save(company);

    return { company };
  }
}

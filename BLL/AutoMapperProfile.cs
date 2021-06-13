using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using RequestProject.BLL.DTO;
using RequestProject.DAL.Models;

namespace BLL
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Service, ServiceDTO>().ReverseMap();
            CreateMap<Request, RequestDTO>()
                .ForMember(dto => dto.Employees, c => c.MapFrom(c => c.Employees.Select(cs => cs.Employee)))
                .ForMember(dto => dto.Services, c => c.MapFrom(c => c.Services.Select(cs => cs.Service)));
        }
    }
}

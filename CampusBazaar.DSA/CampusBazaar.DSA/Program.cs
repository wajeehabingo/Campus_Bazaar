using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Models;
using CampusBazaar.DSA.DataStructures;

namespace CampusBazaar.DSA
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("--- Campus Bazaar DSA Module: Day 4 Trie Prefix Search ---\n");

            ResourceRepository repo = new ResourceRepository();
            Trie titleTrie = new Trie();

            ResourceItem note1 = new ResourceItem(101, "Data Structures Final Notes", "Comprehensive summary of trees and graphs.", "CS-201", "PDF", "Ali Khan");
            ResourceItem note2 = new ResourceItem(102, "Database Systems Lab Manual", "SQL queries and normalization tasks.", "CS-302", "PDF", "Amna Haseeb");
            ResourceItem note3 = new ResourceItem(103, "Calculus Formula Sheet", "Derivatives, integrals, and formulas.", "MTH-101", "TXT", "Sara Ahmed");

            ResourceItem[] initialResources = { note1, note2, note3 };

            foreach (var item in initialResources)
            {
                repo.AddResource(item);
                titleTrie.IndexTitle(item.Title, item.Id);
            }

            string[] testPrefixes = { "dat", "man", "cal", "xyz" };

            foreach (string prefix in testPrefixes)
            {
                Console.WriteLine($"\nPrefix search for '{prefix}':");
                List<int> matchedIds = titleTrie.SearchPrefix(prefix);

                if (matchedIds.Count == 0)
                {
                    Console.WriteLine("  No matching resources found.");
                    continue;
                }

                foreach (int id in matchedIds)
                {
                    ResourceItem item = repo.GetResourceById(id);
                    if (item != null)
                    {
                        Console.WriteLine($"  -> {item}");
                    }
                }
            }

            Console.WriteLine("\nDay 4 Trie prefix search complete! Press any key to exit.");
            Console.ReadKey();
        }
    }
}